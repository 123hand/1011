const MCP_ENDPOINT = "https://mcp.tianyancha.com/v1";

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  if (Array.isArray(value?.items)) return value.items;
  if (Array.isArray(value?.list)) return value.list;
  return [];
}

function formatDate(value) {
  if (!value) return "待核实";
  const date = new Date(Number(value));
  return Number.isNaN(date.getTime()) ? String(value) : date.toISOString().slice(0, 10);
}

function readToolPayload(result) {
  const content = result?.content || result?.result?.content || [];
  const text = content.find(item => item.type === "text")?.text || result?.text || "";
  if (!text) return result?.structuredContent || result?.result || result;
  try {
    return JSON.parse(text);
  } catch (_error) {
    return { _summary: text };
  }
}

function parseMcpResponse(raw) {
  const jsonLine = raw.split("\n").find(line => line.startsWith("data:"));
  return JSON.parse(jsonLine ? jsonLine.slice(5).trim() : raw);
}

async function mcpRequest(apiKey, method, params, sessionId) {
  const response = await fetch(MCP_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: apiKey,
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
      "MCP-Protocol-Version": "2025-03-26",
      "User-Agent": "cmb-kyc-platform/1.0",
      ...(sessionId ? { "Mcp-Session-Id": sessionId } : {})
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: `${Date.now()}-${method}`,
      method,
      params
    })
  });

  const raw = await response.text();
  if (!response.ok) {
    if (response.status === 418) {
      throw new Error("天眼查 MCP 网关拒绝了服务端请求（HTTP 418）。请联系天眼支持确认该 API Key 是否允许 Vercel Serverless 出网调用");
    }
    throw new Error(`天眼查服务请求失败（${response.status}）：${raw.slice(0, 160)}`);
  }
  const payload = parseMcpResponse(raw);
  if (payload.error) throw new Error(payload.error.message || "天眼查服务返回错误");
  return { result: payload.result, sessionId: response.headers.get("mcp-session-id") || sessionId };
}

async function mcpNotify(apiKey, method, params, sessionId) {
  const response = await fetch(MCP_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: apiKey,
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
      "MCP-Protocol-Version": "2025-03-26",
      "User-Agent": "cmb-kyc-platform/1.0",
      "Mcp-Session-Id": sessionId
    },
    body: JSON.stringify({ jsonrpc: "2.0", method, params })
  });
  if (!response.ok) throw new Error(`天眼查 MCP 通知失败（${response.status}）`);
}

function findTool(tools, preferredNames, descriptionPattern) {
  const normalized = tools || [];
  const exact = normalized.find(tool => preferredNames.includes(tool.name));
  if (exact) return exact.name;
  const partial = normalized.find(tool => preferredNames.some(name => tool.name?.includes(name.replace("get_", ""))));
  if (partial) return partial.name;
  return normalized.find(tool => descriptionPattern.test(`${tool.name || ""} ${tool.description || ""}`))?.name;
}

async function createMcpSession(apiKey) {
  const initialized = await mcpRequest(apiKey, "initialize", {
    protocolVersion: "2025-03-26",
    capabilities: {},
    clientInfo: { name: "cmb-kyc-platform", version: "1.0.0" }
  });
  if (!initialized.sessionId) throw new Error("天眼查 MCP 未返回会话标识");
  await mcpNotify(apiKey, "notifications/initialized", {}, initialized.sessionId);
  const listed = await mcpRequest(apiKey, "tools/list", {}, initialized.sessionId);
  return { apiKey, sessionId: initialized.sessionId, tools: listed.result?.tools || [] };
}

async function callTool(session, toolName, argumentsObject) {
  if (!toolName) return {};
  const response = await mcpRequest(session.apiKey, "tools/call", { name: toolName, arguments: argumentsObject }, session.sessionId);
  return readToolPayload(response.result);
}

function buildLiveProfile(registration, shareholders, risks) {
  const shareholderRows = asArray(shareholders).slice(0, 8).map(item => ({
    name: item.name || item.shareholderName || "股东信息待核实",
    pct: Number(String(item.percent || item.ratio || item.shareholderRatio || "0").replace("%", "")) || 0,
    color: "#2B6CB0"
  }));
  const sourceNames = ["天眼查企业工商登记"];
  if (shareholderRows.length) sourceNames.push("天眼查股东结构");
  if (risks && Object.keys(risks).length) sourceNames.push("天眼查风险总览");
  const riskSummary = risks?._summary || risks?.summary || "风险数据待进一步核验";

  return {
    id: `tyc_${registration.creditCode || registration.name || "company"}`,
    name: registration.name || "企业名称待核实",
    code: registration.creditCode || registration.regNumber || "待核实",
    basic: {
      legal: registration.legalPersonName || "待核实",
      date: formatDate(registration.estiblishTime || registration.establishTime),
      capital: registration.regCapital || "待核实",
      status: registration.regStatus || "待核实",
      scope: registration.businessScope || "待核实",
      industry: registration.industry || registration.industryName || "待核实",
      type: registration.companyType || "企业类型待核实",
      term: registration.businessTerm || "待核实"
    },
    shareholders: shareholderRows,
    risk: {
      level: "medium",
      lawsuit: "以天眼查风险总览为准",
      penalty: "以天眼查风险总览为准",
      abnormal: "以天眼查风险总览为准",
      dishonest: "以天眼查风险总览为准",
      related: riskSummary,
      checks: [riskSummary]
    },
    finance: { revenueData: [], debtData: { debtRatio: "待取得财务报表核验" } },
    products: [
      { name: "企业结算与账户服务", fit: "待访谈", reason: "需结合真实结算链路和账户体系核验" },
      { name: "现金管理", fit: "待访谈", reason: "需结合资金归集、支付和闲置资金管理需求核验" }
    ],
    actions: ["核对天眼查工商登记与客户营业执照原件", "围绕经营、结算、资金流与融资安排开展首访", "按行内制度完成KYC、反洗钱与必要的风险核验"],
    sources: sourceNames.map(name => ({ name, detail: `查询时间：${new Date().toLocaleString("zh-CN")}` })),
    manual_review_items: ["财务报表、纳税与流水未通过本次公开查询获取", "实际控制人、受益所有人及授权链路需以客户材料和行内KYC核验"],
    data_quality: {
      source_count: sourceNames.length,
      coverage_rate: shareholderRows.length ? 60 : 45,
      verification_rate: 80,
      pending_review_count: 2
    }
  };
}

async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "method not allowed" });
  const query = String(req.query?.query || "").trim();
  if (!query) return res.status(400).json({ error: "请提供企业名称或统一社会信用代码" });
  const apiKey = process.env.TYC_API_KEY;
  if (!apiKey) return res.status(503).json({ error: "未配置企业数据服务，请联系系统管理员" });

  try {
    const session = await createMcpSession(apiKey);
    const searchTool = findTool(session.tools, ["get_companies", "search_companies", "companies"], /实体|候选|企业搜索|company.*search/i);
    const registrationTool = findTool(session.tools, ["get_registration_info", "registration_info"], /工商|登记|registration/i);
    const shareholderTool = findTool(session.tools, ["get_shareholder_info", "shareholder_info"], /股东|shareholder/i);
    const riskTool = findTool(session.tools, ["get_risk_overview", "risk_overview"], /风险总览|风险.*摘要|risk.*overview/i);
    if (!registrationTool) throw new Error("天眼查 MCP 未提供工商登记查询工具");
    const candidatesPayload = await callTool(session, searchTool, { searchKey: query });
    const candidates = asArray(candidatesPayload);
    const entity = candidates[0] || {};
    const searchKey = entity.creditCode || entity.name || query;
    const registration = await callTool(session, registrationTool, { searchKey });
    const [shareholders, risks] = await Promise.all([
      callTool(session, shareholderTool, { searchKey }).catch(() => []),
      callTool(session, riskTool, { searchKey }).catch(() => ({}))
    ]);
    return res.status(200).json(buildLiveProfile(registration, shareholders, risks));
  } catch (error) {
    return res.status(502).json({ error: error.message || "企业数据查询暂不可用" });
  }
}

module.exports = handler;
module.exports.handler = handler;
module.exports.buildLiveProfile = buildLiveProfile;
