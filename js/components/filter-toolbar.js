class FilterToolbar extends HTMLElement {
  static get observedAttributes() {
    return ['categories', 'active'];
  }

  constructor() {
    super();
    this._categories = [];
    this._active = 'all';
  }

  connectedCallback() {
    setTimeout(() => {
      const categoriesAttr = this.getAttribute('categories') || 'all,best_practice,learning_notes,insight';
      this._categories = categoriesAttr.split(',').map(s => s.trim()).filter(Boolean);
      this._active = this.getAttribute('active') || 'all';
      this.render();
      this.attachHandlers();
    }, 0);
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const active = this.getAttribute('active') || this._active || 'all';
    const categoriesAttr = this.getAttribute('categories');
    const categories = categoriesAttr ? categoriesAttr.split(',').map(s => s.trim()).filter(Boolean) : (this._categories.length ? this._categories : ['all','best_practice','learning_notes','insight']);

    const labelMap = {
      all: 'All Category',
      best_practice: 'Best Practices',
      learning_notes: 'Learning Notes',
      insight: 'Others'
    };

    let html = '<div role="toolbar" aria-label="Article filters">';
    categories.forEach(cat => {
      const isActive = String(active) === String(cat);
      const classes = isActive ? 'btn btn-sm' : 'btn btn-frameless btn-sm';
      const ariaPressed = isActive ? 'true' : 'false';
      const extraStyle = !isActive ? ' style="background-color: var(--grey-text-05-pressing-border);"' : '';
      const label = labelMap[cat] || cat;
      html += `<button type="button" class="${classes}" data-category="${cat}" aria-pressed="${ariaPressed}"${extraStyle}>${label}</button>`;
    });
    html += '</div>';

    this.innerHTML = html;
  }

  attachHandlers() {
    this.addEventListener('click', (e) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      const cat = target.getAttribute('data-category');
      if (!cat) return;

      // Update active
      this.setAttribute('active', cat);

      // Update aria-pressed states
      this.querySelectorAll('button[data-category]').forEach(btn => {
        const isActive = btn.getAttribute('data-category') === cat;
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        if (isActive) {
          btn.className = 'btn btn-sm';
          btn.removeAttribute('style');
        } else {
          btn.className = 'btn btn-frameless btn-sm';
          btn.setAttribute('style', 'background-color: var(--grey-text-05-pressing-border);');
        }
      });

      // Dispatch filter-change event
      const event = new CustomEvent('filter-change', {
        detail: { category: cat },
        bubbles: true,
      });
      this.dispatchEvent(event);
    });
  }
}

customElements.define('filter-toolbar', FilterToolbar);
