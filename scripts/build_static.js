const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const sourceHtml = path.join(rootDir, 'kyc_platform.html');
const sourceDataDir = path.join(rootDir, 'file_store');
const sourceMediaDir = path.join(rootDir, 'media');
const sourceReports = [
  '中国移动_客户经理访前学习调查报告.docx',
  '比亚迪_客户经理访前学习调查报告.docx'
];

const filesToCopy = [
  {
    from: sourceHtml,
    to: path.join(distDir, 'index.html')
  },
  {
    from: path.join(sourceDataDir, 'company_records.js'),
    to: path.join(distDir, 'file_store', 'company_records.js')
  },
  {
    from: path.join(sourceDataDir, 'company_records.json'),
    to: path.join(distDir, 'file_store', 'company_records.json')
  },
  {
    from: path.join(sourceMediaDir, 'cmb_logo_no_background.png'),
    to: path.join(distDir, 'media', 'cmb_logo_no_background.png')
  }
];

function copyFile({ from, to }) {
  if (!fs.existsSync(from)) {
    throw new Error(`Missing required file: ${from}`);
  }

  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
}

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });
filesToCopy.forEach(copyFile);
sourceReports.forEach(name => copyFile({
  from: path.join(rootDir, name),
  to: path.join(distDir, 'reports', name)
}));

console.log(`Static build created: ${distDir}`);
console.log('Publish directory: dist');
