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

// 5. 將 TailorMed 主頁複製到根目錄作為首頁，並調整資源路徑
console.log('\n📋 設置根路徑首頁...');
try {
  const tailormedIndexPath = path.join(DIST_DIR, 'index.html');
  const rootIndexPath = path.join(ROOT_DIR, 'dist/Projects/index.html');
  
  if (fs.existsSync(tailormedIndexPath)) {
    ensureDir(path.dirname(rootIndexPath));
    
    // 讀取 TailorMed 主頁內容
    let indexContent = fs.readFileSync(tailormedIndexPath, 'utf8');
    
    // 調整資源路徑：將相對路徑改為指向 TailorMed 目錄
    // ./css/main.css -> ./TailorMed/css/main.css
    // ./js/main.js -> ./TailorMed/js/main.js
    // ./images/ -> ./TailorMed/images/
    indexContent = indexContent.replace(/href=["']\.\/(css|js|images)/g, 'href="./TailorMed/$1');
    indexContent = indexContent.replace(/src=["']\.\/(css|js|images)/g, 'src="./TailorMed/$1');
    
    // 調整頁面連結路徑：將相對路徑改為指向 TailorMed 目錄
    // solutions/ -> ./TailorMed/solutions/
    // track/index.html -> ./TailorMed/track/index.html
    // company/index.html -> ./TailorMed/company/index.html
    // 但保持 index.html 不變（因為根路徑就是 index.html）
    indexContent = indexContent.replace(/href=(["'])(?!https?:\/\/|#|\.\/TailorMed|index\.html)([^"']+)\1/g, (match, quote, path) => {
      // 跳過已經是絕對路徑或 TailorMed 路徑的連結
      if (path === 'index.html' || path.startsWith('#')) {
        return match;
      }
      // 調整相對路徑
      return `href=${quote}./TailorMed/${path}${quote}`;
    });
    
    // 寫入根目錄
    fs.writeFileSync(rootIndexPath, indexContent);
    console.log('  ✅ 已將 TailorMed 主頁設置為根路徑首頁（已調整資源路徑）');
  } else {
    console.warn('⚠️ 未找到 TailorMed 主頁，跳過根路徑設置');
  }
} catch (error) {
  console.error('❌ 設置根路徑首頁失敗:', error.message);
  // 不中斷編譯流程
}

console.log(
  '🎉 編譯完成！可以在 dist/Projects/TailorMed/index.html 預覽 TailorMed 主專案'
);
