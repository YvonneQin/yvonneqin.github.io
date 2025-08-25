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
          <li class="nav-item"><a data-scroll class="nav-link" href="index.html#about">Skills</a></li>
          <li class="nav-item"><a data-scroll class="nav-link" href="index.html#portfolio">Projects</a></li>
          <li class="nav-item"><a data-scroll class="nav-link" href="my_insight.html">Insights</a></li>
          <li class="nav-item"><a data-scroll class="nav-link" href="index.html#contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  </div>
</header>`;

    // Initialize global external link protection once per page
    if (!window.__protectLinksInitialized) {
      window.__protectLinksInitialized = true;
      const PASSWORD = 'qyw';
      const PROMPT_MSG = 'Hi there! Access to external links requires a password. Please contact me on WeChat at 131 6243 5185 to get it. Kindly fill in the password:';

      function isExternalUrl(href) {
        try {
          const u = new URL(href, window.location.href);
          return u.origin !== window.location.origin;
        } catch (e) {
          return false;
        }
      }

      document.addEventListener('click', function (e) {
        const anchor = e.target && (e.target.closest ? e.target.closest('a[href]') : null);
        if (!anchor) return;

        // Allow opting out
        if (anchor.hasAttribute('data-unprotected')) return;

        const href = anchor.getAttribute('href') || '';
        if (!href) return;

        // Only protect external http(s) links
        if (!/^https?:/i.test(href) && !isExternalUrl(href)) return;

        // If already wrapped by <protected-link>, skip
        if (anchor.closest('protected-link')) return;

        e.preventDefault();
        const input = window.prompt(PROMPT_MSG, '');
        if (input === PASSWORD) {
          const target = anchor.getAttribute('target') || '_blank';
          const rel = anchor.getAttribute('rel') || 'noopener noreferrer';
          window.open(anchor.href, target, 'noopener,noreferrer');
        }
      }, true);
    }
  }
}

customElements.define('site-header', SiteHeader);


