const fs = require("fs");
const assert = require("assert");

const html = fs.readFileSync("kyc_platform.html", "utf8");

[
  "function renderUnlistedCompanyNotice",
  "function buildUnlistedCompanyClient",
  "数据库暂未收录",
  "待补充资料清单",
  "客户准入尽调前置",
].forEach((needle) => {
  assert(html.includes(needle), `Expected kyc_platform.html to include ${needle}`);
});

assert(
  !html.includes("Math.random() * MOCK_CLIENTS.length"),
  "Unknown search should not randomly render a demo company"
);

console.log("search frontend fallback structure ok");
