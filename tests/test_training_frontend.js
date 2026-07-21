const fs = require("fs");
const assert = require("assert");

const html = fs.readFileSync("kyc_platform.html", "utf8");

[
  'id="trainingCenter"',
  'id="trainingModuleGrid"',
  'id="trainingScenario"',
  'id="trainingChecklist"',
  'id="trainingCoachTips"',
  'id="trainingScript"',
  'id="trainingQuiz"',
  "const TRAINING_MODULES",
  "function renderTrainingModule",
  "function selectTrainingModule",
  "function evaluateTrainingQuiz",
  "function buildTrainingCoachTips",
  "training-quiz-question",
  "module.quizzes",
  "访前准备与情报核验",
  "首次拜访需求深挖",
  "贷后回访与风险预警",
  "异议处理话术",
  "王总，您好",
].forEach((needle) => {
  assert(
    html.includes(needle),
    `Expected kyc_platform.html to include ${needle}`
  );
});

[
  "存量客户深耕",
  "增量新客户拓展",
  "客户准入尽调前置",
  "贷款三查",
  "公私联动",
].forEach((topic) => {
  assert(html.includes(topic), `Expected training content to include ${topic}`);
});

[
  "quickSearch('制造业')",
  "quickSearch('商贸')",
  "quickSearch('建筑')",
  "quickSearch('物流')",
  "quickSearch('政府')",
  "quickSearch('小微')",
].forEach((shortcut) => {
  assert(!html.includes(shortcut), `Industry shortcut should be removed: ${shortcut}`);
});

console.log("training frontend structure ok");
