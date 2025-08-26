/**
 * 统一组件加载器
 * 自动加载所有组件，支持按需加载和批量加载
 */
class ComponentLoader {
  constructor() {
    this.components = new Map();
    this.loadedComponents = new Set();
    this.componentRegistry = {
      // 核心组件
      'site-header': 'js/components/header.js',
      'site-footer': 'js/components/footer.js',
      'badge-tag': 'js/components/badge-tag.js',
      'section-header': 'js/components/section-header.js',
      'image-display': 'js/components/image-display.js',
      'quote-block': 'js/components/quote-block.js',
      'figma-embed': 'js/components/figma-embed.js',
      'subtitle': 'js/components/subtitle.js',
      'password-protection': 'js/components/password-protection.js',
      'anchor-navigation': 'js/components/anchor-navigation.js',
      'article-card': 'js/components/article-card.js',
      'filter-toolbar': 'js/components/filter-toolbar.js',
      'protected-link': 'js/components/protected-link.js'
    };
  }

  /**
   * 加载所有组件（推荐用于项目页面）
   */
  async loadAllComponents() {
    console.log('🚀 开始加载所有组件...');
    const loadPromises = Object.values(this.componentRegistry).map(path => this.loadScript(path));
    
    try {
      await Promise.all(loadPromises);
      console.log('✅ 所有组件加载完成！');
      return true;
    } catch (error) {
      console.error('❌ 组件加载失败:', error);
      return false;
    }
  }

  /**
   * 按需加载组件（推荐用于轻量页面）
   */
  async loadComponentsByTags() {
    const tags = this.getRequiredComponents();
    console.log('🎯 检测到需要的组件:', tags);
    
    const loadPromises = tags.map(tag => this.loadComponent(tag));
    
    try {
      await Promise.all(loadPromises);
      console.log('✅ 所需组件加载完成！');
      return true;
    } catch (error) {
      console.error('❌ 组件加载失败:', error);
      return false;
    }
  }

  /**
   * 加载单个组件
   */
  async loadComponent(componentName) {
    if (this.loadedComponents.has(componentName)) {
      return true;
    }

    const path = this.componentRegistry[componentName];
    if (!path) {
      console.warn(`⚠️ 未找到组件: ${componentName}`);
      return false;
    }

    try {
      await this.loadScript(path);
      this.loadedComponents.add(componentName);
      console.log(`✅ 组件加载成功: ${componentName}`);
      return true;
    } catch (error) {
      console.error(`❌ 组件加载失败: ${componentName}`, error);
      return false;
    }
  }

  /**
   * 加载脚本文件
   */
  loadScript(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load: ${src}`));
      document.head.appendChild(script);
    });
  }

  /**
   * 检测页面中需要的组件
   */
  getRequiredComponents() {
    const required = new Set();
    const allElements = document.querySelectorAll('*');
    
    allElements.forEach(element => {
      const tagName = element.tagName.toLowerCase();
      if (this.componentRegistry[tagName]) {
        required.add(tagName);
      }
    });

    return Array.from(required);
  }

  /**
   * 预加载常用组件组合
   */
  async loadCommonComponents() {
    const common = ['site-header', 'site-footer', 'badge-tag'];
    const loadPromises = common.map(component => this.loadComponent(component));
    
    try {
      await Promise.all(loadPromises);
      console.log('✅ 常用组件加载完成！');
      return true;
    } catch (error) {
      console.error('❌ 常用组件加载失败:', error);
      return false;
    }
  }
}

// 创建全局实例
window.ComponentLoader = new ComponentLoader();

// 自动检测并加载组件
document.addEventListener('DOMContentLoaded', async () => {
  // 如果页面中有 data-auto-load-components="true"，则自动加载所有组件
  if (document.documentElement.hasAttribute('data-auto-load-components')) {
    await window.ComponentLoader.loadAllComponents();
  }
  // 否则按需加载
  else {
    await window.ComponentLoader.loadComponentsByTags();
  }
});

// 导出到全局
window.loadAllComponents = () => window.ComponentLoader.loadAllComponents();
window.loadComponentsByTags = () => window.ComponentLoader.loadComponentsByTags();
window.loadCommonComponents = () => window.ComponentLoader.loadCommonComponents();
