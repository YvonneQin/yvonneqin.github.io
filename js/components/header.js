class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
<header class="header fixed-top rad-animation-group" id="header">
  <div class="container rad-fade-in">
    <nav class="navbar navbar-expand-lg navbar-light p-0">
      <a class="navbar-brand" href="index.html">
        <span style="font-size: 24px;">Yuwen</span>
        <span style="font-size: 24px;">Qin</span>
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse"
        data-target="#navbarSupportedContent, #header" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-lg-auto">
          <li class="nav-item"><a class="nav-link" href="index.html">Homepage</a></li>
          <li class="nav-item"><a data-scroll class="nav-link" href="index.html#skills">Skills</a></li>
          <li class="nav-item"><a data-scroll class="nav-link" href="index.html#portfolio">🧩Tinkering Zones</a></li>
          <li class="nav-item"><a data-scroll class="nav-link" href="my_insight.html">Insights</a></li>
          <li class="nav-item"><a data-scroll class="nav-link" href="index.html#contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  </div>
</header>`;
    
    // 确保导航动效正常工作
    this.ensureNavigationEffects();
  }

  ensureNavigationEffects() {
    // 等待DOM完全加载后初始化导航动效
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initNavigationEffects());
    } else {
      this.initNavigationEffects();
    }
  }

  initNavigationEffects() {
    // 确保sticky-header.js的功能正常工作
    if (window.initStickyHeader) {
      window.initStickyHeader();
    }
    
    // 确保导航链接的平滑滚动
    const navLinks = this.querySelectorAll('.nav-link[data-scroll]');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href) return;

        // 仅当目标在当前页面时，才拦截并平滑滚动；
        // 若指向其他页面（例如 index.html#... 且当前不在首页），则允许默认跳转
        if (href.includes('#')) {
          const [targetPageRaw, targetHash] = href.split('#');
          const targetPage = (targetPageRaw || '').trim();
          const currentPage = (location.pathname.split('/').pop() || 'index.html').trim();

          const isSamePageLink =
            targetPage === '' ||
            targetPage === '#' ||
            targetPage === currentPage ||
            // 当当前页面是首页时，视指向 index.html 为同页
            (currentPage === 'index.html' && targetPage === 'index.html');

          if (isSamePageLink) {
            e.preventDefault();
            const targetElement = document.getElementById(targetHash);
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }
      });
    });
  }
}

customElements.define('site-header', SiteHeader);


