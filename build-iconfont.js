#!/usr/bin/env node

/**
 * iconfont 统一管理脚本
 * 使用方法: node build-iconfont.js [新链接]
 */

const fs = require('fs');
const path = require('path');

// 默认配置
const DEFAULT_CONFIG = {
  iconfontUrl: 'https://at.alicdn.com/t/c/font_4545731_1iwxww92za1.css',
  preconnectUrl: 'https://at.alicdn.com'
};

// 获取新的iconfont链接
const newIconfontUrl = process.argv[2] || DEFAULT_CONFIG.iconfontUrl;

console.log(`🔄 正在更新iconfont链接到: ${newIconfontUrl}`);

// 需要更新的HTML文件列表
const htmlFiles = [
  'index.html',
  '_site/index.html',
  'project_Redcity.html',
  '_site/project_Redcity.html',
  'my_insight.html',
  '_site/my_insight.html',
  'project_AI.html',
  '_site/project_AI.html',
  'project_MM.html',
  '_site/project_MM.html',
  'project_DCT.html',
  '_site/project_DCT.html',
  'project_Construct.html',
  '_site/project_Construct.html',
  'project_POC.html',
  '_site/project_POC.html',
  'project_Law.html',
  '_site/project_Law.html',
  'project_Askbob.html',
  '_site/project_Askbob.html',
  'project_Gradute.html',
  '_site/project_Gradute.html',
  'project_COE.html',
  '_site/project_COE.html'
];

// 更新函数
function updateIconfontInFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  文件不存在: ${filePath}`);
    return false;
  }

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 备份原文件
    fs.writeFileSync(`${filePath}.backup`, content);
    
    // 替换iconfont链接
    const iconfontRegex = /https:\/\/at\.alicdn\.com\/t\/c\/font_[^"]*\.css/g;
    const preconnectRegex = /<link\s+rel="preconnect"\s+href="https:\/\/at\.alicdn\.com"/g;
    
    content = content.replace(iconfontRegex, newIconfontUrl);
    content = content.replace(preconnectRegex, `<link rel="preconnect" href="${DEFAULT_CONFIG.preconnectUrl}"`);
    
    // 写回文件
    fs.writeFileSync(filePath, content);
    
    console.log(`✅ 已更新: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ 更新失败: ${filePath}`, error.message);
    return false;
  }
}

// 更新所有文件
let successCount = 0;
let totalCount = 0;

htmlFiles.forEach(file => {
  totalCount++;
  if (updateIconfontInFile(file)) {
    successCount++;
  }
});

console.log(`\n📊 更新完成: ${successCount}/${totalCount} 个文件成功更新`);
console.log(`🔗 新的iconfont链接: ${newIconfontUrl}`);
console.log(`💾 备份文件已保存为 .backup 扩展名`);

// 更新配置文件
const configContent = `// 自动生成的iconfont配置
// 生成时间: ${new Date().toISOString()}
// 当前链接: ${newIconfontUrl}

window.SiteConfig = window.SiteConfig || {};
window.SiteConfig.iconfont = {
  primary: '${newIconfontUrl}',
  preconnect: '${DEFAULT_CONFIG.preconnectUrl}'
};
`;

fs.writeFileSync('js/iconfont-config.js', configContent);
console.log(`📝 配置文件已更新: js/iconfont-config.js`);
