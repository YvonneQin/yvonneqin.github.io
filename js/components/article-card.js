class ArticleCard extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const category = this.getAttribute('category') || 'insight';
    const title = this.getAttribute('title') || '';
    const imageSrc = this.getAttribute('image-src') || '';
    const href = this.getAttribute('href') || '#';
    const isProtected = this.hasAttribute('protected');

    // 构建文章卡片HTML
    this.innerHTML = `
      <div class="article" data-category="${category}">
        <div class="container">
          <div class="row row--padded rad-animation-group rad-fade-down flex-column-reverse flex-md-row">
            <div class="col-12 mt-4 mt-md-0 my-md-auto">
              ${isProtected ? 
                `<a onclick="openProtectedLink(event, '${href}')" class="insight btn btn-frameless" style="cursor: pointer;">` :
                `<a href="${href}" class="insight btn btn-frameless" target="_blank">`
              }
                <div style="padding-top: 14px;">
                  <img class="imgstyle" style="margin-top: 0px" src="${imageSrc}" />
                  <p class="insightlead">${title}</p>
                </div>
              ${isProtected ? '</a>' : '</a>'}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 监听属性变化，重新渲染
  static get observedAttributes() {
    return ['category', 'title', 'image-src', 'href', 'protected'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }
}

// 注册自定义元素
customElements.define('article-card', ArticleCard);
