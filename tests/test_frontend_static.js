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

assert(
  html.includes('class="cmb-brand-logo"') && html.includes('media/cmb_logo_transparent.png'),
  'top navigation should include the supplied China Merchants Bank brand image'
);

assert(
  /\.cmb-brand-logo\s*\{[\s\S]*?object-fit:\s*cover\s*;[\s\S]*?\}/.test(html),
  'brand image should be cropped consistently within the navigation bar'
);

console.log('frontend static checks ok');
