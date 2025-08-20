class QuoteBlock extends HTMLElement {
  static get observedAttributes() {
    return ['quote', 'author', 'source', 'style', 'alignment', 'size', 'color'];
  }

  constructor() {
    super();
    this._quote = '';
    this._author = '';
    this._source = '';
  }

  connectedCallback() {
    // 使用 setTimeout 确保 DOM 完全加载后再渲染
    setTimeout(() => {
      this._quote = this.getAttribute('quote') || this.querySelector('p')?.textContent || '';
      this._author = this.getAttribute('author') || this.querySelector('.blockquote-footer')?.textContent || '';
      this._source = this.getAttribute('source') || '';
      this.render();
    }, 0);
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const quote = this._quote;
    const author = this._author;
    const source = this._source;
    const style = this.getAttribute('style') || 'default';
    const alignment = this.getAttribute('alignment') || 'center';
    const size = this.getAttribute('size') || 'default';
    const color = this.getAttribute('color') || '';
    
    // 构建样式类
    let blockquoteClass = 'blockquote';
    if (alignment === 'center') {
      blockquoteClass += ' text-center';
    } else if (alignment === 'left') {
      blockquoteClass += ' text-left';
    } else if (alignment === 'right') {
      blockquoteClass += ' text-right';
    }
    
    // 构建段落样式
    let paragraphClass = 'mb-0';
    if (size === 'large') {
      paragraphClass += ' lead';
    } else if (size === 'small') {
      paragraphClass += ' small';
    }
    
    // 构建样式
    let styleAttr = '';
    if (color) {
      styleAttr = `style="color: ${color};"`;
    }
    
    let html = `<blockquote class="${blockquoteClass}" ${styleAttr}>`;
    
    if (quote) {
      html += `<p class="${paragraphClass}">${quote}</p>`;
    }
    
    if (author || source) {
      html += '<footer class="blockquote-footer">';
      if (author) {
        html += author;
      }
      if (source) {
        if (author) html += ', ';
        html += `<cite title="${source}">${source}</cite>`;
      }
      html += '</footer>';
    }
    
    html += '</blockquote>';
    
    this.innerHTML = html;
  }
}

customElements.define('quote-block', QuoteBlock);
