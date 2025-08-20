class FigmaEmbed extends HTMLElement {
  static get observedAttributes() {
    return ['url', 'width', 'height', 'title', 'lazy', 'border', 'allowfullscreen', 'scaling'];
  }

  constructor() {
    super();
    this._url = '';
    this._title = '';
  }

  connectedCallback() {
    // 使用 setTimeout 确保 DOM 完全加载后再渲染
    setTimeout(() => {
      this._url = this.getAttribute('url') || this.querySelector('iframe')?.src || '';
      this._title = this.getAttribute('title') || this.querySelector('iframe')?.title || '';
      this.render();
    }, 0);
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const url = this._url;
    const title = this._title;
    const width = this.getAttribute('width') || '1280';
    const height = this.getAttribute('height') || '600';
    const lazy = this.getAttribute('lazy') !== 'false';
    const border = this.getAttribute('border') !== 'false';
    const allowfullscreen = this.getAttribute('allowfullscreen') === 'true';
    const scaling = this.getAttribute('scaling') || 'min-zoom';
    
    if (!url) {
      console.warn('FigmaEmbed: URL is required');
      return;
    }
    
    // 构建Figma embed URL
    let embedUrl = url;
    if (!url.includes('embed_host=share')) {
      embedUrl = `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;
    }
    
    // 构建样式
    let style = `width: ${width}px; height: ${height}px;`;
    if (!border) {
      style += ' border: none;';
    }
    
    // 构建iframe属性
    let iframeAttrs = `src="${embedUrl}" width="${width}" height="${height}"`;
    if (title) iframeAttrs += ` title="${title}"`;
    if (lazy) iframeAttrs += ' loading="lazy"';
    if (allowfullscreen) iframeAttrs += ' allowfullscreen';
    iframeAttrs += ' referrerpolicy="no-referrer-when-downgrade"';
    
    // 构建容器样式类
    let containerClass = 'embed-center';
    if (scaling === 'responsive') {
      containerClass += ' responsive-embed';
    }
    
    let html = `<div class="${containerClass}">`;
    html += `<iframe ${iframeAttrs} style="${style}"></iframe>`;
    html += '</div>';
    
    this.innerHTML = html;
  }
}

customElements.define('figma-embed', FigmaEmbed);
