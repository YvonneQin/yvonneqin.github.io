class ImageDisplay extends HTMLElement {
  static get observedAttributes() {
    return ['src', 'alt', 'subtitle', 'width', 'height', 'lazy', 'clickable', 'caption-style'];
  }

  constructor() {
    super();
    this._src = '';
    this._alt = '';
    this._subtitle = '';
  }

  connectedCallback() {
    // 使用 setTimeout 确保 DOM 完全加载后再渲染
    setTimeout(() => {
      this._src = this.getAttribute('src') || this.querySelector('img')?.src || '';
      this._alt = this.getAttribute('alt') || this.querySelector('img')?.alt || '';
      this._subtitle = this.getAttribute('subtitle') || this.querySelector('.imgsubtitle')?.textContent || '';
      this.render();
    }, 0);
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const src = this._src;
    const alt = this._alt;
    const subtitle = this._subtitle;
    const width = this.getAttribute('width') || '';
    const height = this.getAttribute('height') || '';
    const lazy = this.getAttribute('lazy') !== 'false';
    const clickable = this.getAttribute('clickable') === 'true';
    const captionStyle = this.getAttribute('caption-style') || 'default';
    
    // 构建图片属性
    let imgAttrs = `class="imgstyle" src="${src}"`;
    if (alt) imgAttrs += ` alt="${alt}"`;
    if (width) imgAttrs += ` width="${width}"`;
    if (height) imgAttrs += ` height="${height}"`;
    if (lazy) imgAttrs += ` loading="lazy"`;
    
    // 构建容器样式
    let containerStyle = '';
    if (clickable) {
      containerStyle = 'cursor: pointer; transition: transform 0.2s ease;';
    }
    
    // 构建标题样式类
    let captionClass = 'imgsubtitle';
    if (captionStyle === 'centered') {
      captionClass += ' text-center';
    } else if (captionStyle === 'small') {
      captionClass += ' small';
    }
    
    let html = `<div style="${containerStyle}">`;
    
    if (clickable) {
      html += `<img ${imgAttrs} onclick="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">`;
    } else {
      html += `<img ${imgAttrs}>`;
    }
    
    if (subtitle) {
      html += `<div class="${captionClass}">${subtitle}</div>`;
    }
    
    html += '</div>';
    
    this.innerHTML = html;
  }
}

customElements.define('image-display', ImageDisplay);
