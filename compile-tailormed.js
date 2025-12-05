const fs = require('fs');
const path = require('path');
const pug = require('pug');
const stylus = require('stylus');

const ROOT_DIR = __dirname;
const SRC_DIR = path.join(ROOT_DIR, 'src/Projects/TailorMed');
const DIST_DIR = path.join(ROOT_DIR, 'dist/Projects/TailorMed');

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

function copyDir(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return;
  ensureDir(destDir);
  fs.readdirSync(srcDir).forEach((item) => {
    const srcPath = path.join(srcDir, item);
    const destPath = path.join(destDir, item);
    const stats = fs.statSync(srcPath);

    if (stats.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  });
}

console.log('🏥 開始編譯 TailorMed 主專案...');

// 1. 編譯 Pug -> HTML (遞歸處理子目錄)
try {
  console.log('📝 編譯 Pug 模板...');
  
  const compilePugRecursive = (dir, relativePath = '') => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    entries.forEach((entry) => {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        // 遞歸處理子目錄
        const newRelativePath = relativePath ? `${relativePath}/${entry.name}` : entry.name;
        compilePugRecursive(fullPath, newRelativePath);
      } else if (entry.name.endsWith('.pug')) {
        // 編譯 Pug 文件
        const html = pug.renderFile(fullPath, { pretty: true });
        const outputName = entry.name.replace(/\.pug$/, '.html');
        
        // 確定輸出目錄
        let outputDir = DIST_DIR;
        if (relativePath) {
          outputDir = path.join(DIST_DIR, relativePath);
          ensureDir(outputDir);
        }
        
        const outputPath = path.join(outputDir, outputName);
        fs.writeFileSync(outputPath, html);
        
        const displayPath = relativePath 
          ? `${relativePath}/${outputName}`
          : outputName;
        console.log(`  ✅ 已生成 ${displayPath}`);
      }
    });
  };
  
  const templateDir = path.join(SRC_DIR, 'Templates');
  compilePugRecursive(templateDir);
} catch (error) {
  console.error('❌ Pug 編譯失敗:', error.message);
  process.exit(1);
}

// 2. 編譯 Stylus -> CSS
try {
  console.log('🎨 編譯 Stylus 樣式...');
  const styleDir = path.join(SRC_DIR, 'Styles');
  const stylusFiles = fs
    .readdirSync(styleDir)
    .filter((file) => file.endsWith('.styl'));

  if (stylusFiles.length === 0) {
    console.warn('⚠️ 未找到任何 Stylus 檔案');
  }

  const cssDir = path.join(DIST_DIR, 'css');
  ensureDir(cssDir);

  stylusFiles.forEach((file) => {
    const stylusPath = path.join(styleDir, file);
    const stylusCode = fs.readFileSync(stylusPath, 'utf8');

    stylus(stylusCode)
      .set('filename', stylusPath)
      .set('paths', [styleDir])
      .render((err, css) => {
        if (err) {
          console.error('❌ Stylus 編譯失敗:', err.message);
          process.exit(1);
        }

        const outputName = file.replace(/\.styl$/, '.css');
        fs.writeFileSync(path.join(cssDir, outputName), css);
        console.log(`  ✅ 已生成 css/${outputName}`);
      });
  });
} catch (error) {
  console.error('❌ Stylus 編譯失敗:', error.message);
  process.exit(1);
}

// 3. 複製腳本與資源
console.log('📦 複製靜態資源...');
copyDir(path.join(SRC_DIR, 'Javascript'), path.join(DIST_DIR, 'js'));
copyDir(path.join(SRC_DIR, 'Assets'), path.join(DIST_DIR, 'images'));

console.log('✅ 靜態資源已就緒');

// 4. 編譯 Permission-Matrix 子專案
console.log('\n🔐 開始編譯 Permission-Matrix 子專案...');
try {
  const permissionMatrixDir = path.join(SRC_DIR, 'Permission-Matrix');
  const permissionMatrixDistDir = path.join(DIST_DIR, 'Permission-Matrix');
  
  if (fs.existsSync(permissionMatrixDir)) {
    const compileScript = path.join(permissionMatrixDir, 'compile.js');
    if (fs.existsSync(compileScript)) {
      // 執行 Permission-Matrix 的編譯腳本
      const { execSync } = require('child_process');
      execSync(`node ${compileScript}`, { 
        stdio: 'inherit',
        cwd: ROOT_DIR 
      });
      console.log('✅ Permission-Matrix 編譯完成');
    } else {
      console.warn('⚠️ 未找到 Permission-Matrix 編譯腳本');
    }
  } else {
    console.warn('⚠️ 未找到 Permission-Matrix 目錄');
  }
} catch (error) {
  console.error('❌ Permission-Matrix 編譯失敗:', error.message);
  // 不中斷整個編譯流程，只警告
  console.warn('⚠️ 繼續編譯其他專案...');
}

// 5. 生成專案總覽首頁
console.log('\n📋 生成專案總覽首頁...');
try {
  const indexPath = path.join(ROOT_DIR, 'dist/Projects/index.html');
  const indexHtml = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wireframe Projects - 專案總覽</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans TC', sans-serif;
      line-height: 1.6;
      color: #333;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 2rem;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    header {
      text-align: center;
      color: white;
      margin-bottom: 3rem;
    }
    
    h1 {
      font-size: 3rem;
      margin-bottom: 0.5rem;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
    }
    
    .subtitle {
      font-size: 1.2rem;
      opacity: 0.9;
    }
    
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }
    
    .project-card {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .project-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 40px rgba(0,0,0,0.3);
    }
    
    .project-title {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      color: #667eea;
    }
    
    .project-description {
      color: #666;
      margin-bottom: 1rem;
      font-size: 0.95rem;
    }
    
    .project-links {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .project-link {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background: #667eea;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      transition: background 0.3s ease;
      text-align: center;
    }
    
    .project-link:hover {
      background: #5568d3;
    }
    
    .project-link.secondary {
      background: #764ba2;
    }
    
    .project-link.secondary:hover {
      background: #63408a;
    }
    
    .badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      background: #e0e7ff;
      color: #667eea;
      border-radius: 20px;
      font-size: 0.85rem;
      margin-top: 0.5rem;
    }
    
    @media (max-width: 768px) {
      h1 {
        font-size: 2rem;
      }
      
      .projects-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>🚀 Wireframe Projects</h1>
      <p class="subtitle">所有專案總覽與快速導航</p>
    </header>
    
    <div class="projects-grid">
      <div class="project-card">
        <h2 class="project-title">🏥 TailorMed</h2>
        <p class="project-description">專業冷鏈物流公司網站</p>
        <div class="project-links">
          <a href="./TailorMed/index.html" class="project-link">主頁</a>
          <a href="./TailorMed/track/index.html" class="project-link secondary">貨件追蹤</a>
        </div>
        <span class="badge">企業網站</span>
      </div>
      
      <div class="project-card">
        <h2 class="project-title">🔐 Permission-Matrix</h2>
        <p class="project-description">資料庫權限矩陣系統</p>
        <div class="project-links">
          <a href="./Permission-Matrix/index.html" class="project-link">權限矩陣</a>
        </div>
        <span class="badge">管理系統</span>
      </div>
      
      <div class="project-card">
        <h2 class="project-title">📚 Knowledge Base</h2>
        <p class="project-description">技術知識庫與文件</p>
        <div class="project-links">
          <a href="./knowledgeBase/index.html" class="project-link">知識庫首頁</a>
        </div>
        <span class="badge">文件系統</span>
      </div>
      
      <div class="project-card">
        <h2 class="project-title">🏭 YAANFUHE</h2>
        <p class="project-description">企業官方網站</p>
        <div class="project-links">
          <a href="./YAANFUHE/index.html" class="project-link">網站首頁</a>
        </div>
        <span class="badge">企業網站</span>
      </div>
      
      <div class="project-card">
        <h2 class="project-title">⚡ YnEnergy</h2>
        <p class="project-description">綠色能源解決方案</p>
        <div class="project-links">
          <a href="./ynenergy/index.html" class="project-link">能源網站</a>
        </div>
        <span class="badge">能源網站</span>
      </div>
      
      <div class="project-card">
        <h2 class="project-title">📄 Temp Single Page</h2>
        <p class="project-description">單頁式網站模板</p>
        <div class="project-links">
          <a href="./Temp_singlePage/index.html" class="project-link">單頁網站</a>
        </div>
        <span class="badge">模板</span>
      </div>
    </div>
  </div>
</body>
</html>`;
  
  ensureDir(path.dirname(indexPath));
  fs.writeFileSync(indexPath, indexHtml);
  console.log('  ✅ 已生成專案總覽首頁');
} catch (error) {
  console.error('❌ 生成首頁失敗:', error.message);
  // 不中斷編譯流程
}

console.log(
  '🎉 編譯完成！可以在 dist/Projects/TailorMed/index.html 預覽 TailorMed 主專案'
);
