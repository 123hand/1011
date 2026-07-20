const fs = require("fs");
const assert = require("assert");

const html = fs.readFileSync("kyc_platform.html", "utf8");

[
  "function renderUnlistedCompanyNotice",
  "function buildUnlistedCompanyClient",
  "function tryTianyanLiveSearch",
  "publicSourceLookup",
  "function buildPublicSourceLinks",
  "function savePublicEvidence",
  "function calculateProfileScores",
  "国家企业信用信息公示系统",
  "信用中国",
  "中国执行信息公开网",
  "中国裁判文书网",
  "中国政府采购网",
  "巨潮资讯",
  "客户准入尽调前置",
].forEach((needle) => {
  assert(html.includes(needle), `Expected kyc_platform.html to include ${needle}`);
});

assert(
  !html.includes("数据库暂未收录"),
  "Unlisted companies should offer public-source lookup instead of a database-missing notice"
);

assert(
  !html.includes("Math.random() * MOCK_CLIENTS.length"),
  "Unknown search should not randomly render a demo company"
);

assert(
  !html.includes("profile.risk.level === 'medium' ? 72"),
  "medium-risk profiles should not be forced to a fixed 72-point score"
);

assert(
  html.includes("/api/company-live?query="),
  "unlisted companies should query the Tianyancha live endpoint before falling back"
);

assert(
  html.includes("天眼查实时查询未完成"),
  "live query errors should be shown instead of silently appearing as missing local data"
);

console.log("search frontend fallback structure ok");
