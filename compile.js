const pug = require('pug');
const stylus = require('stylus');
const fs = require('fs');
const path = require('path');

console.log('🚀 開始編譯 Website Wireframe Dashboard...\n');

// 編譯 Pug 模板
try {
  console.log('📝 編譯 Pug 模板...');

  // 讀取專案配置
  const projectsConfig = JSON.parse(
    fs.readFileSync('projects-config.json', 'utf8')
  );
  console.log(`📋 載入 ${projectsConfig.projects.length} 個專案配置`);

  const template = fs.readFileSync(
    'src/Dashboard/src/templates/index.pug',
    'utf8'
  );
  const html = pug.render(template, {
    projects: projectsConfig.projects,
  });

  // 確保 dist 目錄存在
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
  }

  fs.writeFileSync('index.html', html);
  console.log('✅ Pug 模板編譯完成\n');
} catch (error) {
  console.error('❌ Pug 編譯錯誤:', error.message);
  process.exit(1);
}

// 編譯 Stylus 樣式
try {
  console.log('🎨 編譯 Stylus 樣式...');
  const stylusCode = fs.readFileSync(
    'src/Dashboard/src/styles/main.styl',
    'utf8'
  );
  stylus.render(
    stylusCode,
    { filename: 'src/Dashboard/src/styles/main.styl' },
    (err, css) => {
      if (err) {
        console.error('❌ Stylus 編譯錯誤:', err.message);
        process.exit(1);
      }

      // 確保 css 目錄存在
      if (!fs.existsSync('dist/css')) {
        fs.mkdirSync('dist/css', { recursive: true });
      }

      fs.writeFileSync('dist/css/main.css', css);
      console.log('✅ Stylus 樣式編譯完成\n');
      console.log('🎉 編譯完成！Dashboard 已生成到根目錄');
      console.log('📁 開啟 index.html 來預覽 Dashboard');
    }
  );
} catch (error) {
  console.error('❌ Stylus 編譯錯誤:', error.message);
  process.exit(1);
}
