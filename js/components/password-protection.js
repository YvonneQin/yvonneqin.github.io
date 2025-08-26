class PasswordProtection extends HTMLElement {
  constructor() {
    super();
    this.maxAttempts = 3;
    this.password = 'qyw';
    this.welcomeMessage = 'Thanks for stopping in!';
    this.redirectUrl = 'index.html';
  }

  connectedCallback() {
    this.checkPassword();
  }

  checkPassword() {
    let attempts = 0;
    const maxAttempts = this.maxAttempts;
    
    const promptPassword = () => {
      const input = window.prompt(
        'Welcome to my secret portfolio vault 🚪🔑',
        ''
      );

      if (input === null) {
        // User cancelled, go back
        history.go(-1);
        return;
      }

      if (input === this.password) {
        // Correct password
        window.alert(this.welcomeMessage);
        
        // 密码验证成功后，加载页面组件
        if (window.ComponentManager) {
          console.log('🔓 密码验证成功，开始加载页面组件...');
          window.ComponentManager.loadByPageType();
        }
        
        return;
      }

      // Wrong password
      attempts++;
      if (attempts >= maxAttempts) {
        // Max attempts reached, go back
        history.go(-1);
        return;
      }

      // Try again
      window.alert('Error, pls fill in again:');
      promptPassword();
    };

    promptPassword();
  }
}

customElements.define('password-protection', PasswordProtection);
