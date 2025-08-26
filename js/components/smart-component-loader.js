/**
 * 智能组件加载器 - 解决依赖关系问题
 * 支持渐进式加载和错误恢复
 */
class SmartComponentLoader {
  constructor() {
    this.componentRegistry = {
      // 核心组件（必须最先加载）
      'password-protection': 'js/components/password-protection.js',
      
      // 基础组件（第二优先级）
      'site-header': 'js/components/header.js',
      'site-footer': 'js/components/footer.js',
      
      // 功能组件（第三优先级）
      'badge-tag': 'js/components/badge-tag.js',
      'section-header': 'js/components/section-header.js',
      'image-display': 'js/components/image-display.js',
      'quote-block': 'js/components/quote-block.js',
      'figma-embed': 'js/components/figma-embed.js',
      'subtitle': 'js/components/subtitle.js',
      'anchor-navigation': 'js/components/anchor-navigation.js',
      'article-card': 'js/components/article-card.js',
      'filter-toolbar': 'js/components/filter-toolbar.js',
      'protected-link': 'js/components/protected-link.js'
    };
    
    this.loadedComponents = new Set();
    this.loadingPromises = new Map();
    this.isInitialized = false;
  }

  /**
   * 初始化组件加载器
   */
  async initialize() {
    if (this.isInitialized) return;
    
    console.log('🚀 智能组件加载器初始化...');
    
    try {
      // 1. 首先加载密码保护组件（如果存在）
      await this.loadPasswordProtection();
      
      // 2. 然后加载基础组件
      await this.loadBasicComponents();
      
      // 3. 最后加载功能组件
      await this.loadFunctionalComponents();
      
      this.isInitialized = true;
      console.log('✅ 智能组件加载器初始化完成！');
      
    } catch (error) {
      console.error('❌ 组件加载器初始化失败:', error);
      // 即使失败也要尝试加载基础组件
      await this.loadBasicComponents();
    }
  }

  /**
   * 加载密码保护组件
   */
  async loadPasswordProtection() {
    const hasPasswordProtection = document.querySelector('password-protection');
    if (hasPasswordProtection) {
      console.log('🔒 检测到密码保护，优先加载...');
      await this.loadComponent('password-protection');
    }
  }

  /**
   * 加载基础组件
   */
  async loadBasicComponents() {
    const basicComponents = ['site-header', 'site-footer'];
    console.log('🏗️ 加载基础组件...');
    
    for (const component of basicComponents) {
      try {
        await this.loadComponent(component);
      } catch (error) {
        console.warn(`⚠️ 基础组件加载失败: ${component}`, error);
      }
    }
  }

  /**
   * 加载功能组件
   */
  async loadFunctionalComponents() {
    const functionalComponents = [
      'badge-tag', 'section-header', 'image-display', 
      'quote-block', 'figma-embed', 'subtitle', 
      'anchor-navigation', 'article-card', 'filter-toolbar', 'protected-link'
    ];
    
    console.log('⚙️ 加载功能组件...');
    
    // 并行加载所有功能组件
    const loadPromises = functionalComponents.map(component => 
      this.loadComponent(component).catch(error => {
        console.warn(`⚠️ 功能组件加载失败: ${component}`, error);
        return false;
      })
    );
    
    await Promise.allSettled(loadPromises);
  }

  /**
   * 加载单个组件
   */
  async loadComponent(componentName) {
    // 如果已经加载，直接返回
    if (this.loadedComponents.has(componentName)) {
      return true;
    }

    // 如果正在加载，等待加载完成
    if (this.loadingPromises.has(componentName)) {
      return await this.loadingPromises.get(componentName);
    }

    const path = this.componentRegistry[componentName];
    if (!path) {
      console.warn(`⚠️ 未找到组件: ${componentName}`);
      return false;
    }

    // 创建加载Promise
    const loadPromise = this.loadScript(path).then(() => {
      this.loadedComponents.add(componentName);
      this.loadingPromises.delete(componentName);
      console.log(`✅ 组件加载成功: ${componentName}`);
      return true;
    }).catch(error => {
      this.loadingPromises.delete(componentName);
      console.error(`❌ 组件加载失败: ${componentName}`, error);
      throw error;
    });

    this.loadingPromises.set(componentName, loadPromise);
    return await loadPromise;
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
   * 检查组件是否已加载
   */
  isComponentLoaded(componentName) {
    return this.loadedComponents.has(componentName);
  }

  /**
   * 获取已加载的组件列表
   */
  getLoadedComponents() {
    return Array.from(this.loadedComponents);
  }

  /**
   * 强制重新加载组件
   */
  async reloadComponent(componentName) {
    this.loadedComponents.delete(componentName);
    return await this.loadComponent(componentName);
  }
}

// 创建全局实例
window.SmartComponentLoader = new SmartComponentLoader();

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', async () => {
  await window.SmartComponentLoader.initialize();
});

// 导出到全局
window.initializeComponentLoader = () => window.SmartComponentLoader.initialize();
window.loadComponent = (name) => window.SmartComponentLoader.loadComponent(name);
window.isComponentLoaded = (name) => window.SmartComponentLoader.isComponentLoaded(name);
