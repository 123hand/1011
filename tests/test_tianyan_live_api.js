const assert = require("assert");
const fs = require("fs");

const apiPath = "api/company-live.js";

assert(fs.existsSync(apiPath), "Vercel should expose a live Tianyancha query endpoint");

const api = require(`../${apiPath}`);
const source = fs.readFileSync(apiPath, "utf8");

assert.strictEqual(typeof api, "function", "Vercel Node functions must export the request handler directly");
assert.strictEqual(typeof api.handler, "function", "live endpoint should export a handler");
assert.strictEqual(typeof api.buildLiveProfile, "function", "live endpoint should normalize verified company data");
assert(source.includes("process.env.TAVILY_API_KEY"), "live search should use a Tavily server-side key");
assert(source.includes("process.env.DEEPSEEK_API_KEY"), "report generation should use a DeepSeek server-side key");
assert(source.includes("deepseek-v4-flash"), "live report generation should use the current DeepSeek Flash model");
assert(source.includes("RECENT_SENTIMENT_DAYS"), "live search should define a recent sentiment window");
assert(source.includes("recent_sentiment"), "live search should include a recent sentiment evidence category");
assert(source.includes("financial_disclosures"), "live search should retrieve financial disclosure evidence separately");

const profile = api.buildLiveProfile("测试企业有限公司", {
  basic: { legal: "待核实", industry: "企业服务" },
  risk: { level: "medium" },
  shareholders: []
}, [{ title: "官网", url: "https://example.com", content: "测试资料" }]);

assert.strictEqual(profile.name, "测试企业有限公司");
assert.strictEqual(profile.basic.legal, "待核实");
assert.strictEqual(profile.data_quality.source_count, 1);

console.log("Tianyancha live API structure ok");
