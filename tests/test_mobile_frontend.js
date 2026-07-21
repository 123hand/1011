const fs = require("fs");
const assert = require("assert");

const html = fs.readFileSync("kyc_platform.html", "utf8");

[
  "@media (max-width: 768px)",
  "@media (max-width: 480px)",
  ".top-nav",
  ".nav-right",
  ".search-section",
  ".search-input-wrapper",
  ".search-tags",
  ".content-tabs",
  ".content-tab",
  ".stats-grid",
  ".scenario-grid",
  ".info-grid",
  ".analysis-grid",
  ".development-grid",
  ".training-module-grid",
  ".training-quiz-group",
  ".field-edit-form",
  ".report-actions",
  "overflow-x: auto",
  "grid-template-columns: 1fr",
  "min-height: 44px",
].forEach((needle) => {
  assert(html.includes(needle), `Expected mobile responsive CSS to include ${needle}`);
});

assert(
  html.indexOf("@media (max-width: 768px)") < html.indexOf("@media (max-width: 480px)"),
  "Expected 768px rules to appear before narrower 480px refinements"
);

console.log("mobile frontend responsive structure ok");
