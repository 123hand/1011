const fs = require("fs");
const assert = require("assert");

const html = fs.readFileSync("kyc_platform.html", "utf8");

[
  "function exportReport",
  "function printReport",
  "function buildPrintableReportHtml",
  "function openPrintableReport",
  "function downloadReportHtml",
  "function downloadPdfReport",
  "html2pdf",
  "报告执行摘要",
  "关键资料缺口与复核优先级",
  "拜访节奏与责任动作",
  "window.print()",
  "客户经理访前学习调查报告",
  "目  录",
  "一、客户基础信息",
  "二、股东结构与实控人",
  "三、主营业务与商业模式",
  "四、经营与财务分析",
  "五、行业地位与竞争格局",
  "六、信用与风险画像",
  "七、业务合作机会评估",
  "八、拜访策略与行动建议",
  "九、合规尽调要点",
  "十、效率KPI价值看板",
  "数据采集与验证",
  "AI分析与报告生成",
].forEach((needle) => {
  assert(html.includes(needle), `Expected kyc_platform.html to include ${needle}`);
});

assert(
  !html.includes("PDF导出功能需对接后端服务，当前为演示模式"),
  "PDF export should not remain a demo-only alert"
);

assert(
  html.includes(".pdf"),
  "mobile export should generate a PDF file rather than only an HTML fallback"
);

console.log("report export frontend structure ok");
