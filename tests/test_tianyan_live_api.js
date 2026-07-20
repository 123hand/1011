const assert = require("assert");
const fs = require("fs");

const apiPath = "api/company-live.js";

assert(fs.existsSync(apiPath), "Vercel should expose a live Tianyancha query endpoint");

const api = require(`../${apiPath}`);
const source = fs.readFileSync(apiPath, "utf8");

assert.strictEqual(typeof api.handler, "function", "live endpoint should export a handler");
assert.strictEqual(typeof api.buildLiveProfile, "function", "live endpoint should normalize verified company data");
assert(source.includes("process.env.TYC_API_KEY"), "API key should be read from Vercel environment variables");
assert(source.includes("tools/list"), "MCP tool names should be discovered from the live server");

const profile = api.buildLiveProfile({
  name: "测试企业有限公司",
  creditCode: "91310000TEST000001",
  regStatus: "存续",
  legalPersonName: "法定代表人",
  regCapital: "1000万人民币",
  estiblishTime: 1704067200000,
  businessScope: "企业管理咨询"
}, [], []);

assert.strictEqual(profile.name, "测试企业有限公司");
assert.strictEqual(profile.basic.legal, "法定代表人");
assert.strictEqual(profile.data_quality.source_count, 1);

console.log("Tianyancha live API structure ok");
