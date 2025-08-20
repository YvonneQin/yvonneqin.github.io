class Subtitle extends HTMLElement {
  static get observedAttributes() {
    return ['text', 'level', 'style', 'color', 'size', 'alignment', 'margin'];
  }

  constructor() {
    super();
    this._text = '';
  }

  connectedCallback() {
    // 使用 setTimeout 确保 DOM 完全加载后再渲染
    setTimeout(() => {
      this._text = this.getAttribute('text') || this.textContent || '';
      this.render();
    }, 0);
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const text = this._text;
    const level = this.getAttribute('level') || '4';
    const style = this.getAttribute('style') || 'default';
    const color = this.getAttribute('color') || '';
    const size = this.getAttribute('size') || 'default';
    const alignment = this.getAttribute('alignment') || 'left';
    const margin = this.getAttribute('margin') || '';
    
    if (!text) {
      console.warn('Subtitle: Text content is required');
      return;
    }
    
    // 构建样式类
    let className = `title${level}`;
    
    // 构建样式属性
    let styleAttr = '';
    let styles = [];
    
    if (color) {
      styles.push(`color: ${color}`);
    }
    
    if (alignment === 'center') {
      styles.push('text-align: center');
    } else if (alignment === 'right') {
      styles.push('text-align: right');
    }
    
    if (size === 'large') {
      styles.push('font-size: 1.5em');
    } else if (size === 'small') {
      styles.push('font-size: 0.9em');
    }
    
    if (margin) {
      styles.push(`margin: ${margin}`);
    }
    
    if (styles.length > 0) {
      styleAttr = `style="${styles.join('; ')}"`;
    }
    
    // 构建HTML
    let html = `<div class="${className}" ${styleAttr}>${text}</div>`;
    
    this.innerHTML = html;
  }
}

customElements.define('subtitle', Subtitle);
