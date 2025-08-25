class ProtectedPage extends HTMLElement {
  connectedCallback() {
    const password = this.getAttribute('password') || '';
    const redirect = this.getAttribute('redirect') || 'index.html';
    const tries = parseInt(this.getAttribute('tries') || '3', 10);
    const noSession = this.hasAttribute('no-session');
    const sessionKey = this.getAttribute('session-key') || `protected:${location.pathname}`;

    // If already validated this session, skip prompt
    if (!noSession) {
      try {
        if (sessionStorage.getItem(sessionKey) === 'ok') {
          return;
        }
      } catch (_) {}
    }

    // Respect reduced motion users by not flashing content; hide root until validated
    const root = document.documentElement;
    const previousVisibility = root.style.visibility;
    root.style.visibility = 'hidden';

    const doPrompt = () => {
      let attempts = 0;
      while (attempts < tries) {
        const input = window.prompt(
          this.getAttribute('prompt') ||
            'Hi there! Welcome to my site and portfolio! Due to the use of portfolio is for my job hunting, I have to set a password requirement for access. If you need to visit, please contact me on WeChat at 131 6243 5185. Kindly fill in the password:',
          ''
        );
        if (input === null) {
          window.location.replace(redirect);
          return;
        }
        if (input === password) {
          if (!noSession) {
            try { sessionStorage.setItem(sessionKey, 'ok'); } catch(_) {}
          }
          root.style.visibility = previousVisibility || '';
          return;
        }
        attempts += 1;
        if (attempts >= tries) {
          window.location.replace(redirect);
          return;
        }
        window.alert('Error, please fill in again.');
      }
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', doPrompt, { once: true });
    } else {
      doPrompt();
    }
  }
}

customElements.define('protected-page', ProtectedPage);


