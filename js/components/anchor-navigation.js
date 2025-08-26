class AnchorNavigation extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute('title') || '大纲';
    const items = this.getAttribute('items') || '[]';
    
    try {
      const navigationItems = JSON.parse(items);
      
      this.innerHTML = `
        <div class="fixed-anchor row row--padded rad-animation-group rad-fade-down flex-column-reverse flex-md-row">
          <a style="font-weight: 600;font-size: 16px; color: var(--mode-light-text-85-primary);">${title}</a>
          ${navigationItems.map(item => this.renderNavigationItem(item)).join('')}
        </div>
      `;
    } catch (error) {
      console.error('Failed to parse navigation items:', error);
      this.innerHTML = `
        <div class="fixed-anchor row row--padded rad-animation-group rad-fade-down flex-column-reverse flex-md-row">
          <a style="font-weight: 600;font-size: 16px; color: var(--mode-light-text-85-primary);">${title}</a>
        </div>
      `;
    }
  }

  renderNavigationItem(item) {
    const { href, text, icon, level = 0 } = item;
    const indent = level > 0 ? `<i class="icon-bullet-point iconfont"></i>` : '';
    const indentClass = level > 0 ? 'indent-' + level : '';
    
    return `<a href="${href}" class="${indentClass}">${indent}${text}</a>`;
  }

  // 监听属性变化，重新渲染
  static get observedAttributes() {
    return ['title', 'items'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }
}

// 注册自定义元素
customElements.define('anchor-navigation', AnchorNavigation);
