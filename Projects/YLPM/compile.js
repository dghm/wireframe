const pug = require('pug');
const stylus = require('stylus');
const fs = require('fs');
const path = require('path');

console.log('🚀 開始編譯 YLPM 線框圖...\n');

// 確保 dist 目錄存在
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}
if (!fs.existsSync('dist/css')) {
  fs.mkdirSync('dist/css');
}

// 編譯 Pug 模板
try {
  console.log('📝 編譯 Pug 模板...');

  // 定義所有需要編譯的頁面
  const pages = [
    { input: 'index.pug', output: 'index.html' },
    { input: 'about.pug', output: 'about.html' },
  ];

  // 編譯每個頁面
  pages.forEach((page) => {
    const templatePath = `src/templates/${page.input}`;
    if (fs.existsSync(templatePath)) {
      const template = fs.readFileSync(templatePath, 'utf8');
      const html = pug.render(template, { pretty: true });
      fs.writeFileSync(`dist/${page.output}`, html);
      console.log(`✅ 已編譯 ${page.input} -> ${page.output}`);
    } else {
      console.log(`⚠️  ${templatePath} 不存在，跳過編譯`);
    }
  });

  console.log('✅ 所有 Pug 模板編譯完成\n');
} catch (error) {
  console.error('❌ Pug 編譯錯誤:', error.message);
  process.exit(1);
}

// 編譯 Stylus 樣式
try {
  console.log('🎨 編譯 Stylus 樣式...');
  const stylusPath = 'src/styles/main.styl';

  if (fs.existsSync(stylusPath)) {
    const stylusCode = fs.readFileSync(stylusPath, 'utf8');
    stylus.render(stylusCode, { filename: stylusPath }, (err, css) => {
      if (err) {
        console.error('❌ Stylus 編譯錯誤:', err.message);
        process.exit(1);
      }
      fs.writeFileSync('dist/css/main.css', css);
      console.log('✅ Stylus 樣式編譯完成\n');
      console.log('🎉 編譯完成！可以在 dist/ 目錄中查看結果');
      console.log('📁 開啟 dist/index.html 來預覽線框圖');
    });
  } else {
    console.log('⚠️  src/styles/main.styl 不存在，跳過樣式編譯');
    console.log('🎉 模板編譯完成！');
  }
} catch (error) {
  console.error('❌ Stylus 編譯錯誤:', error.message);
  process.exit(1);
}
