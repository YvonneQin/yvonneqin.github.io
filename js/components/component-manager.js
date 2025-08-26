/**
 * 智能组件管理器
 * 支持页面级别的组件配置和自动加载
 */
class ComponentManager {
  constructor() {
    this.components = {
      // 核心组件（所有页面都需要）
      core: [
        'site-header',
        'site-footer'
      ],
      
      // 项目页面组件
      project: [
        'badge-tag',
        'section-header',
        'image-display',
        'quote-block',
        'figma-embed',
        'subtitle',
        'password-protection',
        'anchor-navigation'
      ],
      
      // 文章页面组件
      article: [
        'article-card',
        'filter-toolbar',
        'protected-link'
      ],
      
      // 首页组件
      home: [
        'badge-tag',
        'section-header'
      ]
    };
    
    this.componentPaths = {
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
    
    this.loadedComponents = new Set();
  }

  /**
   * 根据页面类型自动加载组件
   */
  async loadByPageType(pageType = 'auto') {
    if (pageType === 'auto') {
      pageType = this.detectPageType();
    }
    
    console.log(`🎯 检测到页面类型: ${pageType}`);
    
    const componentsToLoad = [
      ...this.components.core,
      ...(this.components[pageType] || [])
    ];
    
    return await this.loadComponents(componentsToLoad);
  }

  /**
   * 自动检测页面类型
   */
  detectPageType() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || '';
    
    if (filename === 'index.html' || filename === '' || filename === '/') {
      return 'home';
    } else if (filename.startsWith('project_')) {
      return 'project';
    } else if (filename === 'my_insight.html') {
      return 'article';
    }
    
    return 'core'; // 默认只加载核心组件
  }

  /**
   * 加载指定组件列表
   */
  async loadComponents(componentNames) {
    const unloadedComponents = componentNames.filter(name => !this.loadedComponents.has(name));
    
    if (unloadedComponents.length === 0) {
      console.log('✅ 所有需要的组件已加载');
      return true;
    }
    
    console.log(`🚀 开始加载组件: ${unloadedComponents.join(', ')}`);
    
    const loadPromises = unloadedComponents.map(name => this.loadComponent(name));
    
    try {
      await Promise.all(loadPromises);
      console.log('✅ 组件加载完成！');
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
    const path = this.componentPaths[componentName];
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
   * 预加载常用组件组合
   */
  async preloadCommon() {
    return await this.loadComponents(this.components.core);
  }

  /**
   * 获取已加载的组件列表
   */
  getLoadedComponents() {
    return Array.from(this.loadedComponents);
  }

  /**
   * 检查组件是否已加载
   */
  isComponentLoaded(componentName) {
    return this.loadedComponents.has(componentName);
  }
}

// 创建全局实例
window.ComponentManager = new ComponentManager();

// 自动加载组件 - 延迟到密码验证后
document.addEventListener('DOMContentLoaded', async () => {
  // 检查是否有密码保护组件
  const hasPasswordProtection = document.querySelector('password-protection');
  
  if (hasPasswordProtection) {
    // 如果有密码保护，等待密码验证完成后再加载组件
    console.log('🔒 检测到密码保护，等待验证完成...');
    // 不自动加载，等待密码验证完成
  } else {
    // 没有密码保护，直接加载组件
    await window.ComponentManager.loadByPageType();
  }
});

// 导出到全局
window.loadComponentsByType = (type) => window.ComponentManager.loadByPageType(type);
window.preloadCommonComponents = () => window.ComponentManager.preloadCommon();
window.getLoadedComponents = () => window.ComponentManager.getLoadedComponents();
