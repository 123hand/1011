const fs = require("fs");
const assert = require("assert");

const html = fs.readFileSync("kyc_platform.html", "utf8");

[
  "function exportReport",
  "function previewReport",
  "function openReportPreview",
  "function closeReportPreview",
  "function printReport",
  "function buildPrintableReportHtml",
  "function openPrintableReport",
  "function downloadReportHtml",
  "function downloadPdfReport",
  "function getProjectReportOverride",
  "html2pdf",
  "报告执行摘要",
  "关键资料缺口与复核优先级",
  "拜访节奏与责任动作",
  "附录一、经营与决策链路访谈底稿",
  "附录二、财务与资金流核验底稿",
  "附录三、风险预警与贷后关注清单",
  "附录四、30/60/90天客户推进计划",
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

assert(
  html.includes("function getProjectReportOverride"),
  "project reports should enrich the dynamic template"
);

assert(
  html.includes("outputPdf('blob')"),
  "mobile export should create a completed PDF blob before downloading"
);

assert(
  !html.includes("function getProjectReportFile"),
  "project reports should not bypass the dynamic template with source docx downloads"
);

assert(
  html.includes("CHBN") && html.includes("刀片电池"),
  "the dynamic template should contain the project-report details for China Mobile and BYD"
);

assert(
  html.includes("if (projectReport) return buildProjectPrintableReportHtml"),
  "China Mobile and BYD exports should replace, rather than append to, generic report content"
);

assert(
  html.includes("function buildProjectPrintableReportHtml"),
  "project reports should have a dedicated dynamic body using the existing export flow"
);

assert(
  html.includes("2026年7月12日") && html.includes("4.8次") && html.includes("债券承销"),
  "China Mobile export should use the user-provided report data rather than the older summary"
);

assert(
  !html.includes("报告内容：本页面已按项目内"),
  "report cover should not expose an implementation note"
);

assert(
  html.includes("downloadReportHtml(html);\n        return;"),
  "mobile export should download the report HTML directly instead of blocking on PDF canvas rendering"
);

assert(
  html.includes("setTimeout(() => URL.revokeObjectURL(url), 30000)"),
  "mobile report download should keep its blob URL alive long enough for the browser to finish"
);

assert(
  html.includes("KPI数据待人工核验"),
  "unmeasured KPI fields should not be presented as zero values"
);

assert(
  html.includes("报告预览"),
  "mobile users should be able to preview the due diligence report without downloading it"
);

console.log("report export frontend structure ok");
