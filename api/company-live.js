const TAVILY_ENDPOINT = "https://api.tavily.com/search";
const DEEPSEEK_ENDPOINT = "https://api.deepseek.com/chat/completions";

function cleanText(value, fallback = "待核实") {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeRiskLevel(level) {
  return ["low", "medium", "high"].includes(level) ? level : "medium";
}

function buildLiveProfile(query, analysis, searchResults) {
  const basic = analysis?.basic || {};
  const risk = analysis?.risk || {};
  const sources = asArray(searchResults).slice(0, 8).map(item => ({
    name: cleanText(item.title, "公开网页资料"),
    url: cleanText(item.url, ""),
    detail: `Tavily 联网检索，查询时间：${new Date().toLocaleString("zh-CN")}`
  }));
  const shareholders = asArray(analysis?.shareholders).slice(0, 8).map((item, index) => ({
    name: cleanText(item.name, "股东信息待核实"),
    pct: Number(item.pct) || 0,
    color: ["#2B6CB0", "#38A169", "#D69E2E", "#805AD5"][index % 4]
  }));
  const reviewItems = asArray(analysis?.manual_review_items).filter(Boolean);

  return {
    id: `web_${encodeURIComponent(query)}`,
    name: cleanText(analysis?.company_name, query),
    code: cleanText(basic.credit_code),
    basic: {
      legal: cleanText(basic.legal),
      date: cleanText(basic.established_date),
      capital: cleanText(basic.registered_capital),
      status: cleanText(basic.status),
      scope: cleanText(basic.business_scope),
      industry: cleanText(basic.industry),
      type: cleanText(basic.company_type),
      term: cleanText(basic.business_term)
    },
    shareholders,
    risk: {
      level: normalizeRiskLevel(risk.level),
      lawsuit: cleanText(risk.lawsuit),
      penalty: cleanText(risk.penalty),
      abnormal: cleanText(risk.abnormal),
      dishonest: cleanText(risk.dishonest),
      related: cleanText(risk.summary),
      checks: asArray(risk.checks).map(text => ({ text, status: "warn" }))
    },
    finance: { revenueData: [], debtData: { debtRatio: "需以财务报表核验" } },
    products: asArray(analysis?.products).map(item => ({
      name: cleanText(item.name),
      fit: cleanText(item.fit, "待访谈"),
      reason: cleanText(item.reason)
    })),
    actions: asArray(analysis?.actions).filter(Boolean),
    sources,
    manual_review_items: reviewItems.length ? reviewItems : ["公开资料不足，需补充营业执照、财务报表及行内KYC材料核验"],
    data_quality: {
      source_count: sources.length,
      coverage_rate: Math.min(85, 30 + sources.length * 8),
      verification_rate: sources.length >= 3 ? 80 : 65,
      pending_review_count: reviewItems.length || 1
    }
  };
}

async function searchWithTavily(apiKey, query) {
  const response = await fetch(TAVILY_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: apiKey,
      query: `${query} 企业 工商信息 主营业务 风险 公开资料`,
      search_depth: "advanced",
      topic: "general",
      max_results: 8,
      include_answer: false,
      include_raw_content: false
    })
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.detail || payload.error || `Tavily 搜索失败（${response.status}）`);
  const results = asArray(payload.results).filter(item => item.url && item.content);
  if (!results.length) throw new Error("Tavily 未返回可引用的公开资料，请使用完整企业名称或统一社会信用代码重试");
  return results;
}

function buildAnalysisPrompt(query, results) {
  const evidence = results.map((item, index) => ({
    id: index + 1,
    title: item.title,
    url: item.url,
    content: String(item.content || "").slice(0, 3500)
  }));
  return `请根据以下联网检索到的公开资料，为招商银行对公客户经理生成可验证的企业访前画像。\n\n严格规则：\n1. 只能使用资料中明确出现的事实；缺失字段写“待核实”，不得猜测。\n2. 不要输出身份证号、银行账号、密码等个人敏感信息。\n3. 不得给出授信审批结论、额度或利率承诺。\n4. 风险结论必须谨慎，并把需要人工复核的内容列出。\n5. 只输出 JSON，不要 Markdown。\n\n企业查询词：${query}\n\n返回 JSON Schema：\n{\n  "company_name":"",\n  "basic":{"credit_code":"","legal":"","established_date":"","registered_capital":"","status":"","business_scope":"","industry":"","company_type":"","business_term":""},\n  "shareholders":[{"name":"","pct":0}],\n  "risk":{"level":"low|medium|high","lawsuit":"","penalty":"","abnormal":"","dishonest":"","summary":"","checks":[""]},\n  "products":[{"name":"","fit":"待访谈|中适配|高适配","reason":""}],\n  "actions":[""],\n  "manual_review_items":[""]\n}\n\n公开资料：\n${JSON.stringify(evidence)}`;
}

async function analyzeWithDeepSeek(apiKey, query, results) {
  const response = await fetch(DEEPSEEK_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "deepseek-v4-flash",
      temperature: 0.1,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "你是合规审慎的招商银行对公客户经理智能体，只基于提供的公开资料输出 JSON。" },
        { role: "user", content: buildAnalysisPrompt(query, results) }
      ]
    })
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error?.message || `DeepSeek 分析失败（${response.status}）`);
  const content = payload.choices?.[0]?.message?.content;
  if (!content) throw new Error("DeepSeek 未返回分析内容");
  try {
    return JSON.parse(content);
  } catch (_error) {
    throw new Error("DeepSeek 返回内容不是有效的结构化数据");
  }
}

async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "method not allowed" });
  const query = String(req.query?.query || "").trim();
  if (!query) return res.status(400).json({ error: "请提供企业名称或统一社会信用代码" });
  const tavilyKey = process.env.TAVILY_API_KEY;
  const deepseekKey = process.env.DEEPSEEK_API_KEY;
  if (!tavilyKey || !deepseekKey) {
    return res.status(503).json({ error: "未配置联网搜索或 AI 分析服务，请检查 Vercel 环境变量" });
  }

  try {
    const results = await searchWithTavily(tavilyKey, query);
    const analysis = await analyzeWithDeepSeek(deepseekKey, query, results);
    return res.status(200).json(buildLiveProfile(query, analysis, results));
  } catch (error) {
    return res.status(502).json({ error: error.message || "企业公开资料查询暂不可用" });
  }
}

module.exports = handler;
module.exports.handler = handler;
module.exports.buildLiveProfile = buildLiveProfile;
