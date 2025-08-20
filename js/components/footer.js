class SiteFooter extends HTMLElement {
  connectedCallback() {
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
          <a class="nav-link" href="index.html">Homepage</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="index.html#about">Skills</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="index.html#portfolio">Projects</a>
        </li>
        <li class="nav-item">
          <a data-scroll class="nav-link" href="my_insight.html">Insights</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="index.html#contact">Contact</a>
        </li>
      </ul>
    </div>
  </div>
</footer>`;
  }
}

customElements.define('site-footer', SiteFooter);
