const pug = require('pug');
const stylus = require('stylus');
const fs = require('fs');
const path = require('path');

// 設定路徑
const PROJECT_ROOT = path.resolve(__dirname, '../../..');
const DIST_DIR = path.join(PROJECT_ROOT, 'dist', 'ylpm2');

console.log('🚀 開始編譯 YLPM2 智慧解決方案網站...\n');

// 編譯 Pug 模板
try {
  console.log('📝 編譯 Pug 模板...');
  
  // 定義所有需要編譯的頁面
  const pages = [
    { input: 'index.pug', output: 'index.html' }
  ];
  
  // 確保 dist 目錄存在
  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
  }
  
  // 編譯每個頁面
  pages.forEach(page => {
    const template = fs.readFileSync(`src/templates/${page.input}`, 'utf8');
    const html = pug.render(template);
    fs.writeFileSync(path.join(DIST_DIR, page.output), html);
    console.log(`✅ 已編譯 ${page.input} -> dist/ylpm2/${page.output}`);
  });
  
  console.log('✅ 所有 Pug 模板編譯完成\n');
} catch (error) {
  console.error('❌ Pug 編譯錯誤:', error.message);
  process.exit(1);
}

// 編譯 Stylus 樣式
try {
  console.log('🎨 編譯 Stylus 樣式...');
  const stylusCode = fs.readFileSync('src/styles/main.styl', 'utf8');
  stylus.render(stylusCode, {filename: 'src/styles/main.styl'}, (err, css) => {
    if (err) {
      console.error('❌ Stylus 編譯錯誤:', err.message);
      process.exit(1);
    }
    // 確保 CSS 目錄存在
    const cssDir = path.join(DIST_DIR, 'css');
    if (!fs.existsSync(cssDir)) {
      fs.mkdirSync(cssDir, { recursive: true });
    }
    
    fs.writeFileSync(path.join(cssDir, 'main.css'), css);
    console.log('✅ Stylus 樣式編譯完成\n');
    console.log('🎉 編譯完成！可以在 dist/ylpm2/ 目錄中查看結果');
    console.log('📁 開啟 dist/ylpm2/index.html 來預覽網站');
  });
} catch (error) {
  console.error('❌ Stylus 編譯錯誤:', error.message);
  process.exit(1);
}
