class SectionHeader extends HTMLElement {
  static get observedAttributes() {
    return ['number', 'title', 'subtitle', 'show-number'];
  }

  constructor() {
    super();
    this._number = '';
    this._title = '';
    this._subtitle = '';
  }

  connectedCallback() {
    // 使用 setTimeout 确保 DOM 完全加载后再渲染
    setTimeout(() => {
      this._number = this.getAttribute('number') || this.querySelector('.titlenumber')?.textContent || '';
      this._title = this.getAttribute('title') || this.querySelector('.sectiontitle')?.textContent || '';
      this._subtitle = this.getAttribute('subtitle') || this.querySelector('.sectiontitle-eng')?.textContent || '';
      this.render();
    }, 0);
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const number = this._number;
    const title = this._title;
    const subtitle = this._subtitle;
    const showNumber = this.getAttribute('show-number') !== 'false';
    
    let headerHtml = '<div>';
    
    if (showNumber && number) {
      headerHtml += `<div class="titlenumber">${number}</div>`;
    }
    
    if (title) {
      headerHtml += `<div class="sectiontitle">${title}</div>`;
    }
    
    if (subtitle) {
      headerHtml += `<div class="sectiontitle-eng">${subtitle}</div>`;
    }
    
    headerHtml += '</div>';
    
    this.innerHTML = headerHtml;
  }
}

customElements.define('section-header', SectionHeader);
