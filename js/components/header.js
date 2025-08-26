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
          <li class="nav-item"><a data-scroll class="nav-link" href="index.html#portfolio">🧩 Tinkering Zone</a></li>
          <li class="nav-item"><a data-scroll class="nav-link" href="my_insight.html">Insights</a></li>
          <li class="nav-item"><a data-scroll class="nav-link" href="index.html#contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  </div>
</header>`;
  }
}

customElements.define('site-header', SiteHeader);


