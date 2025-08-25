class ProtectedLink extends HTMLElement {
  static get observedAttributes() {
    return ['href', 'password', 'prompt'];
  }

  constructor() {
    super();
    this._href = '';
    this._password = 'qyw';
    this._prompt = 'Access requires a password. Please contact me to get it:';
    this._initialized = false;
  }

  connectedCallback() {
    setTimeout(() => {
      this._href = this.getAttribute('href') || '';
      this._password = this.getAttribute('password') || this._password;
      this._prompt = this.getAttribute('prompt') || this._prompt;
      this.render();
      this.attachHandler();
    }, 0);
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const linkContent = this.innerHTML || '';
    const href = this._href;
    const rel = 'noopener noreferrer';
    const target = '_blank';

    this.innerHTML = `<a href="${href}" target="${target}" rel="${rel}">${linkContent}</a>`;
  }

  attachHandler() {
    if (this._initialized) return;
    this._initialized = true;
    const anchor = this.querySelector('a');
    if (!anchor) return;
    anchor.addEventListener('click', (e) => {
      const requirePassword = (this.getAttribute('password') || '').length > 0;
      if (!requirePassword) return;
      e.preventDefault();
      const input = window.prompt(this._prompt, '');
      if (input === this._password) {
        window.open(this._href, '_blank', 'noopener,noreferrer');
      }
    });
  }
}

customElements.define('protected-link', ProtectedLink);
