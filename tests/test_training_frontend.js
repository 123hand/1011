const fs = require("fs");
const assert = require("assert");

const html = fs.readFileSync("kyc_platform.html", "utf8");

[
  'id="trainingCenter"',
  'id="trainingModuleGrid"',
  'id="trainingScenario"',
  'id="trainingChecklist"',
  'id="trainingScript"',
  'id="trainingQuiz"',
  "const TRAINING_MODULES",
  "function renderTrainingModule",
  "function selectTrainingModule",
  "function evaluateTrainingQuiz",
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

console.log("training frontend structure ok");
