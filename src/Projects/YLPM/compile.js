const fs = require('fs');
const path = require('path');
const pug = require('pug');
const stylus = require('stylus');

const ROOT = __dirname;
const DIST = path.join(ROOT, '../../..', 'dist', 'Projects', 'YLPM');
const TEMPLATE_PATH = path.join(ROOT, 'Templates/index.pug');
const STYLUS_PATH = path.join(ROOT, 'Styles/main.styl');
const ASSETS_PATH = path.join(ROOT, 'Assets');

const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const copyDir = (source, target) => {
  if (!fs.existsSync(source)) return;

  ensureDir(target);

  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const srcPath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, targetPath);
    } else {
      fs.copyFileSync(srcPath, targetPath);
    }
  }
};

const compilePugRecursive = (dir, relativePath = '') => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  entries.forEach((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // 遞歸處理子目錄
      const newRelativePath = relativePath
        ? `${relativePath}/${entry.name}`
        : entry.name;
      compilePugRecursive(fullPath, newRelativePath);
    } else if (entry.name.endsWith('.pug')) {
      // 編譯 Pug 文件
      const html = pug.renderFile(fullPath, { pretty: true });
      const outputName = entry.name.replace(/\.pug$/, '.html');

      // 確定輸出目錄
      let outputDir = DIST;
      if (relativePath) {
        outputDir = path.join(DIST, relativePath);
        ensureDir(outputDir);
      }

      const outputPath = path.join(outputDir, outputName);
      fs.writeFileSync(outputPath, html);

      const displayPath = relativePath
        ? `dist/Projects/YLPM/${relativePath}/${outputName}`
        : `dist/Projects/YLPM/${outputName}`;
      console.log(`  ✅ 生成 ${displayPath}`);
    }
  });
};

const compile = async () => {
  console.log('🚀 Building YLPM Wireframe...');

  ensureDir(DIST);

  // Compile Pug (遞歸編譯所有模板)
  console.log('📝 編譯 Pug 模板...');
  const TEMPLATES_DIR = path.join(ROOT, 'Templates');
  compilePugRecursive(TEMPLATES_DIR);

  // Compile Stylus
  console.log('🎨 編譯 Stylus 樣式...');
  const stylusCode = fs.readFileSync(STYLUS_PATH, 'utf8');
  stylus(stylusCode)
    .set('filename', STYLUS_PATH)
    .render((err, css) => {
      if (err) {
        console.error('❌ Stylus compile failed:', err.message);
        process.exit(1);
      }

      ensureDir(path.join(DIST, 'css'));
      fs.writeFileSync(path.join(DIST, 'css/main.css'), css);
      console.log('✅ Stylus compiled to dist/Projects/YLPM/css/main.css');

      // Copy assets if exists
      if (fs.existsSync(ASSETS_PATH)) {
        copyDir(ASSETS_PATH, path.join(DIST, 'images'));
        console.log('✅ Assets copied to dist/Projects/YLPM/images');
      }

      console.log('🎉 YLPM Wireframe build complete.');
    });
};

compile();
