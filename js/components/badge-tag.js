class BadgeTag extends HTMLElement {
  static get observedAttributes() {
    return ['background-color', 'color', 'size', 'variant'];
  }

  constructor() {
    super();
    this._textContent = '';
  }

  connectedCallback() {
    // 使用 setTimeout 确保 DOM 完全加载后再渲染
    setTimeout(() => {
      this._textContent = this.textContent || this.getAttribute('text') || '';
      this.render();
    }, 0);
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const backgroundColor = this.getAttribute('background-color') || '';
    const color = this.getAttribute('color') || '';
    const size = this.getAttribute('size') || 'default';
    const variant = this.getAttribute('variant') || 'rounded-pill';
    
    // 使用保存的文字内容
    const text = this._textContent;
    
    // 构建样式
    let style = '';
    if (backgroundColor) {
      style += `background-color:${backgroundColor}!important;`;
    }
    if (color) {
      style += `color:${color}!important;`;
    }
    
    // 构建类名
    let className = 'badge-2';
    if (variant === 'rounded-pill') {
      className += ' rounded-pill';
    }
    if (size === 'small') {
      className += ' badge-sm';
    } else if (size === 'large') {
      className += ' badge-lg';
    }
    
    this.innerHTML = `<span class="${className}" ${style ? `style="${style}"` : ''}>${text}</span>`;
  }
}

customElements.define('badge-tag', BadgeTag);
