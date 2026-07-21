const TAVILY_ENDPOINT = "https://api.tavily.com/search";
const DEEPSEEK_ENDPOINT = "https://api.deepseek.com/chat/completions";
const RECENT_SENTIMENT_DAYS = 30;

function cleanText(value, fallback = "待核实") {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeRiskLevel(level) {
  return ["low", "medium", "high"].includes(level) ? level : "medium";
}

function buildEvidenceQueries(query) {
  return [
    {
      category: "company_profile",
      topic: "general",
      query: `${query} 官网 工商信息 法定代表人 注册资本 统一社会信用代码 股东`
    },
    {
      category: "financial_disclosures",
      topic: "general",
      query: `${query} 年报 财务报告 营业收入 净利润 资产负债 现金流 公告`
    },
    {
      category: "risk_legal",
      topic: "general",
      query: `${query} 司法风险 行政处罚 经营异常 失信 被执行人 公开信息`
    },
    {
      category: "recent_sentiment",
      topic: "news",
      days: RECENT_SENTIMENT_DAYS,
      query: `${query} 最近新闻 舆情 经营动态`
    }
  ];
}

async function searchWithTavily(apiKey, request) {
  const response = await fetch(TAVILY_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: apiKey,
      query: request.query,
      search_depth: "advanced",
      topic: request.topic,
      max_results: 4,
      days: request.days,
      include_answer: false,
      include_raw_content: false
    })
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.detail || payload.error || `Tavily search failed (${response.status})`);
  return asArray(payload.results)
    .filter(item => item.url && item.content)
    .map(item => ({
      ...item,
      category: request.category,
      published_date: item.published_date || ""
    }));
}

async function collectEvidence(apiKey, query) {
  const settled = await Promise.allSettled(
    buildEvidenceQueries(query).map(request => searchWithTavily(apiKey, request))
  );
  const seenUrls = new Set();
  const evidence = settled.flatMap(result => result.status === "fulfilled" ? result.value : [])
    .filter(item => {
      if (seenUrls.has(item.url)) return false;
      seenUrls.add(item.url);
      return true;
    })
    .slice(0, 16);
  if (!evidence.length) throw new Error("未获取到可引用的公开资料，请使用完整企业名称或统一社会信用代码重试");
  return evidence;
}

function buildLiveProfile(query, analysis, evidence) {
  const basic = analysis?.basic || {};
  const risk = analysis?.risk || {};
  const sources = asArray(evidence).map(item => ({
    name: cleanText(item.title, "公开网页资料"),
    url: cleanText(item.url, ""),
    category: item.category || "company_profile",
    published_date: item.published_date || "",
    detail: `${item.category || "公开资料"}${item.published_date ? ` · ${item.published_date}` : ""}`
  }));
  const shareholders = asArray(analysis?.shareholders).slice(0, 8).map((item, index) => ({
    name: cleanText(item.name, "股东信息待核实"),
    pct: Number(item.pct) || 0,
    color: ["#2B6CB0", "#38A169", "#D69E2E", "#805AD5"][index % 4]
  }));
  const reviewItems = asArray(analysis?.manual_review_items).filter(Boolean);
  const recentSentiment = asArray(analysis?.recent_sentiment).filter(Boolean);
  const checks = asArray(risk.checks).concat(
    recentSentiment.map(item => `近30天舆情：${typeof item === "string" ? item : cleanText(item.summary)}`)
  ).map(text => ({ text, status: "warn" }));
  const evidenceCategories = new Set(sources.map(source => source.category));

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
      checks,
      recent_sentiment: recentSentiment
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
      coverage_rate: Math.min(90, 25 + evidenceCategories.size * 15 + sources.length * 2),
      verification_rate: evidenceCategories.size >= 3 ? 80 : 65,
      pending_review_count: reviewItems.length || 1
    }
  };
}

function buildAnalysisPrompt(query, evidence) {
  const sources = evidence.map((item, index) => ({
    id: index + 1,
    category: item.category,
    title: item.title,
    url: item.url,
    published_date: item.published_date || "",
    content: String(item.content || "").slice(0, 1800)
  }));
  return `请根据以下联网公开资料，为招商银行对公客户经理生成可验证的企业访前画像。\n\n规则：\n1. 只能使用资料中明确出现的事实；缺失字段写“待核实”，不得猜测。\n2. 工商股权、财务、司法风险、舆情均应优先引用对应 category 的资料。\n3. recent_sentiment 只能引用 category=recent_sentiment 且有发布日期、在最近${RECENT_SENTIMENT_DAYS}天内的资料；没有则返回空数组。\n4. 不输出个人敏感信息，不给出授信审批、额度或利率结论。\n5. 只输出 JSON，不要 Markdown。\n\n企业查询词：${query}\n\nJSON Schema：\n{\n  "company_name":"",\n  "basic":{"credit_code":"","legal":"","established_date":"","registered_capital":"","status":"","business_scope":"","industry":"","company_type":"","business_term":""},\n  "shareholders":[{"name":"","pct":0}],\n  "risk":{"level":"low|medium|high","lawsuit":"","penalty":"","abnormal":"","dishonest":"","summary":"","checks":[""]},\n  "recent_sentiment":[{"summary":"","published_date":"","source_url":"","tone":"positive|neutral|negative"}],\n  "products":[{"name":"","fit":"待访谈|中适配|高适配","reason":""}],\n  "actions":[""],\n  "manual_review_items":[""]\n}\n\n公开资料：\n${JSON.stringify(sources)}`;
}

async function analyzeWithDeepSeek(apiKey, query, evidence) {
  const response = await fetch(DEEPSEEK_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "deepseek-v4-flash",
      temperature: 0.1,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "你是合规审慎的招商银行对公客户经理智能体，只能基于提供的公开资料输出 JSON。" },
        { role: "user", content: buildAnalysisPrompt(query, evidence) }
      ]
    })
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error?.message || `DeepSeek analysis failed (${response.status})`);
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
    const evidence = await collectEvidence(tavilyKey, query);
    const analysis = await analyzeWithDeepSeek(deepseekKey, query, evidence);
    return res.status(200).json(buildLiveProfile(query, analysis, evidence));
  } catch (error) {
    return res.status(502).json({ error: error.message || "企业公开资料查询暂不可用" });
  }
}

module.exports = handler;
module.exports.handler = handler;
module.exports.buildLiveProfile = buildLiveProfile;
module.exports.collectEvidence = collectEvidence;
