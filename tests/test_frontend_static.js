const fs = require('fs');
const assert = require('assert');

const html = fs.readFileSync('kyc_platform.html', 'utf8');

assert(
  !html.includes('未检测到本地后端服务'),
  'backend-missing fallback notice should not be shown in the page'
);

assert(
  /\.dev-banner::before\s*\{[\s\S]*?pointer-events:\s*none\s*;[\s\S]*?\}/.test(html),
  'decorative dev-banner pseudo element must not intercept button clicks'
);

console.log('frontend static checks ok');
