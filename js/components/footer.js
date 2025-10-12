class SiteFooter extends HTMLElement {
  connectedCallback() {
    // Ensure the component renders even if called multiple times
    if (this.innerHTML.trim() === '') {
      this.innerHTML = `
<footer class="footer">
  <div class="container">
    <div class="footer__left">
      <div class="footer__copy">
        Designed and coded by Yuwen. All rights reserved.
      </div>
    </div>
    <div class="footer__links">
      <ul class="navbar-nav ">
        <li class="nav-item">
          <a class="nav-link" href="index.html">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="index.html#about">Skills</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="index.html#portfolio">🧩 Tinkering Zones</a>
        </li>
        <li class="nav-item">
          <a data-scroll class="nav-link" href="my_insight.html">Insights<i class="icon-a-directto-s iconfont"></i></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="index.html#contact">Contact me</a>
        </li>
      </ul>
    </div>
  </div>
</footer>`;
    }
  }
}

customElements.define('site-footer', SiteFooter);
