class PasswordProtection extends HTMLElement {
  constructor() {
    super();
    this.maxAttempts = 3;
    this.password = 'qyw';
    this.welcomeMessage = 'Thanks for stopping in!';
    this.redirectUrl = 'index.html';
    this.paymentImagePath = 'img/general/pay_me_a_USDT .jpg';
    
    // X Layer链上钱包配置
    this.walletConfig = {
      address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6', // 你的钱包地址
      network: 'xlayer', // X Layer网络
      chainId: 196, // X Layer链ID
      token: 'USDT', // 代币类型
      amount: 0.1, // 期望收到的USDT数量
      // X Layer RPC端点
      rpcUrl: 'https://rpc.xlayer.tech',
      // 使用公开API，无需密钥
    };
  }

  connectedCallback() {
    this.showAccessOptions();
  }

  showAccessOptions() {
    // 使用系统弹窗选择访问方式
    const accessChoice = window.confirm(
      'Welcome to my secret portfolio vault 🚪🔑\n\n' +
      'Choose your access method:\n\n' +
      'OK = 🔑 Enter Password\n' +
      'Cancel = 💰 Pay with USDT'
    );

    if (accessChoice) {
      // 用户选择密码方式
      this.handlePasswordAccess();
    } else {
      // 用户选择支付方式
      this.handlePaymentAccess();
    }
  }

  handlePasswordAccess() {
    let attempts = 0;
    const maxAttempts = this.maxAttempts;
    
    const promptPassword = () => {
      const input = window.prompt(
        '🔑 Enter Password\n\n' +
        `Attempts remaining: ${maxAttempts - attempts}`,
        ''
      );

      if (input === null) {
        // User cancelled, redirect to home page
        window.location.href = 'index.html';
        return;
      }

      if (input === this.password) {
        // Correct password
        window.alert(this.welcomeMessage);
        this.grantAccess();
        return;
      }

      // Wrong password
      attempts++;
      if (attempts >= maxAttempts) {
        // Max attempts reached, redirect to home page
        window.alert('❌ Maximum attempts reached. Access denied.');
        window.location.href = 'index.html';
        return;
      }

      // Try again
      window.alert('❌ Error, pls fill in again:');
      promptPassword();
    };

    promptPassword();
  }

  handlePaymentAccess() {
    // 显示支付二维码弹窗
    this.showPaymentQR();
  }

  showPaymentQR() {
    // 检测深色主题 - 直接检查html元素的dark类
    const isDarkMode = document.documentElement.classList.contains('dark');
    
    console.log('🌓 Dark mode detected:', isDarkMode);
    console.log('🔍 HTML classes:', document.documentElement.className);
    
    // 创建系统样式的支付弹窗
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: ${isDarkMode ? '#000000' : '#ffffff'};
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
      font-family: system-ui, -apple-system, sans-serif;
      transition: all 0.3s ease;
    `;

    // 创建弹窗容器
    const dialog = document.createElement('div');
    dialog.style.cssText = `
      background: ${isDarkMode ? '#1a1a1a' : 'white'};
      border-radius: 8px;
      box-shadow: ${isDarkMode ? '0 4px 20px rgba(0, 0, 0, 0.5)' : '0 4px 20px rgba(0, 0, 0, 0.15)'};
      min-width: 400px;
      max-width: 500px;
      overflow: hidden;
      border: 1px solid ${isDarkMode ? '#ffffff33' : '#e9ecef'};
      transition: all 0.3s ease;
    `;

    // 创建标题栏
    const titleBar = document.createElement('div');
    titleBar.style.cssText = `
      background: ${isDarkMode ? 'rgba(255, 255, 255, 0.08)' : '#f8f9fa'};
      padding: 16px 20px;
      border-bottom: 1px solid ${isDarkMode ? '#ffffff33' : '#e9ecef'};
      font-weight: 600;
      font-size: 16px;
      color: ${isDarkMode ? '#ffffffd9' : '#212529'};
      transition: all 0.3s ease;
    `;
    titleBar.textContent = '💰 Pay with USDT';

    // 创建内容区域
    const content = document.createElement('div');
    content.style.cssText = `
      padding: 20px;
      text-align: center;
      color: ${isDarkMode ? '#ffffffd9' : '#495057'};
      line-height: 1.5;
      transition: all 0.3s ease;
    `;
    content.innerHTML = `
      <div style="margin-bottom: 16px;">
        Scan the QR code below with your wallet app to complete payment.
      </div>
      <img src="${this.paymentImagePath}" alt="USDT Payment QR Code" 
           style="max-width: 200px; border: 1px solid ${isDarkMode ? '#ffffff33' : '#dee2e6'}; border-radius: 6px; margin: 16px 0;">
      <div style="color: ${isDarkMode ? '#ffffff73' : '#6c757d'}; font-size: 14px; margin-bottom: 20px;">
        After completing the payment, click "I've Paid" below.
      </div>
    `;

    // 创建按钮区域
    const buttonArea = document.createElement('div');
    buttonArea.style.cssText = `
      padding: 16px 20px;
      background: ${isDarkMode ? 'rgba(255, 255, 255, 0.08)' : '#f8f9fa'};
      border-top: 1px solid ${isDarkMode ? '#ffffff33' : '#e9ecef'};
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      transition: all 0.3s ease;
    `;

    // 创建按钮 - 直接复制站点按钮结构
    const cancelBtn = document.createElement('a');
    cancelBtn.href = '#';
    cancelBtn.className = 'btn btn-frameless';
    cancelBtn.style.height = '36px';
    cancelBtn.textContent = 'Cancel';
    cancelBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // 取消时直接关闭弹窗，不访问目标页面
      document.body.removeChild(overlay);
      themeObserver.disconnect();
      // 可以选择跳转到首页或其他安全页面
      window.location.href = 'index.html';
    });

    const confirmBtn = document.createElement('a');
    confirmBtn.href = '#';
    confirmBtn.className = 'btn btn-primary';
    confirmBtn.style.height = '36px';
    confirmBtn.textContent = 'I\'ve Paid';
    confirmBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.verifyPayment(overlay, confirmBtn);
    });

    // 组装弹窗
    buttonArea.appendChild(cancelBtn);
    buttonArea.appendChild(confirmBtn);

    dialog.appendChild(titleBar);
    dialog.appendChild(content);
    dialog.appendChild(buttonArea);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    // 点击遮罩层关闭
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        document.body.removeChild(overlay);
        themeObserver.disconnect(); // 清理监听器
        // 点击遮罩层也跳转到首页，不访问目标页面
        window.location.href = 'index.html';
      }
    });

    // 主题变化监听器
    const themeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const newIsDarkMode = document.documentElement.classList.contains('dark');
          
          if (newIsDarkMode !== isDarkMode) {
            console.log('🔄 Theme changed, updating modal...');
            // 重新创建弹窗以应用新主题
            document.body.removeChild(overlay);
            this.showPaymentQR();
          }
        }
      });
    });
    
    // 只监听html元素的class变化
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // ESC键关闭
    const handleKeydown = (e) => {
      if (e.key === 'Escape') {
        document.body.removeChild(overlay);
        document.removeEventListener('keydown', handleKeydown);
        themeObserver.disconnect(); // 清理监听器
        // ESC键也跳转到首页，不访问目标页面
        window.location.href = 'index.html';
      }
    };
    document.addEventListener('keydown', handleKeydown);
  }

  createSiteButton(text, type, onClick) {
    const isDarkMode = document.documentElement.classList.contains('dark');
    const button = document.createElement('button');
    
    // 添加站点按钮类名
    button.className = 'btn';
    if (type === 'frameless') {
      button.classList.add('btn-frameless');
    } else if (type === 'primary') {
      button.classList.add('btn-primary');
    }
    
    // 基础样式 - 匹配站点按钮
    button.style.cssText = `
      height: 36px;
      padding: 8px 16px;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      min-width: 100px;
      border: 1px solid;
      text-transform: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    `;
    
    // 根据按钮类型和主题设置样式
    if (type === 'frameless') {
      // My Resume 按钮样式 (btn-frameless)
      if (isDarkMode) {
        button.style.cssText += `
          background-color: transparent !important;
          color: #ffffffd9 !important;
          border-color: #ffffff33 !important;
        `;
      } else {
        button.style.cssText += `
          background-color: transparent !important;
          color: #333333 !important;
          border-color: #e0e0e0 !important;
        `;
      }
    } else if (type === 'primary') {
      // Check it out 按钮样式 (btn-primary)
      if (isDarkMode) {
        button.style.cssText += `
          background-color: #ffffff14 !important;
          color: #ffffffd9 !important;
          border-color: #ffffff33 !important;
        `;
      } else {
        button.style.cssText += `
          background-color: #000000 !important;
          color: #ffffff !important;
          border-color: #000000 !important;
        `;
      }
    }
    
    button.textContent = text;
    button.addEventListener('click', onClick);
    
    // 悬停效果 - 匹配站点按钮的悬停效果
    button.addEventListener('mouseenter', () => {
      if (type === 'frameless') {
        if (isDarkMode) {
          button.style.backgroundColor = 'rgba(255, 255, 255, 0.08) !important';
          button.style.borderColor = '#ffffff66 !important';
          button.style.color = '#ffffff !important';
        } else {
          button.style.backgroundColor = 'rgba(0, 0, 0, 0.06) !important';
          button.style.borderColor = '#666666 !important';
          button.style.color = '#333333 !important';
        }
      } else if (type === 'primary') {
        if (isDarkMode) {
          button.style.backgroundColor = '#ffffff33 !important';
          button.style.borderColor = '#ffffff66 !important';
          button.style.color = '#ffffff !important';
        } else {
          button.style.backgroundColor = '#000000 !important';
          button.style.borderColor = '#000000 !important';
          button.style.color = '#ffffff !important';
        }
      }
    });
    
    button.addEventListener('mouseleave', () => {
      if (type === 'frameless') {
        if (isDarkMode) {
          button.style.backgroundColor = 'transparent !important';
          button.style.borderColor = '#ffffff33 !important';
          button.style.color = '#ffffffd9 !important';
        } else {
          button.style.backgroundColor = 'transparent !important';
          button.style.borderColor = '#e0e0e0 !important';
          button.style.color = '#333333 !important';
        }
      } else if (type === 'primary') {
        if (isDarkMode) {
          button.style.backgroundColor = '#ffffff14 !important';
          button.style.borderColor = '#ffffff33 !important';
          button.style.color = '#ffffffd9 !important';
        } else {
          button.style.backgroundColor = '#000000 !important';
          button.style.borderColor = '#000000 !important';
          button.style.color = '#ffffff !important';
        }
      }
    });

    return button;
  }


  async verifyPayment(overlay, confirmBtn) {
    // 更新按钮状态
    confirmBtn.textContent = 'Verifying...';
    confirmBtn.style.pointerEvents = 'none';
    confirmBtn.style.opacity = '0.6';
    
    try {
      // 检查链上交易
      const paymentVerified = await this.checkBlockchainPayment();
      
      if (paymentVerified) {
        // 支付验证成功
        confirmBtn.textContent = '✅ Verified!';
        confirmBtn.style.backgroundColor = '#28a745';
        
        setTimeout(() => {
          document.body.removeChild(overlay);
          window.alert('✅ Payment verified! Welcome!');
          this.grantAccess();
        }, 1500);
      } else {
        // 支付未验证
        confirmBtn.textContent = '❌ Payment not found';
        confirmBtn.style.backgroundColor = '#dc3545';
        
        setTimeout(() => {
          confirmBtn.textContent = 'I\'ve Paid';
          confirmBtn.style.pointerEvents = 'auto';
          confirmBtn.style.opacity = '1';
          confirmBtn.style.backgroundColor = '';
        }, 3000);
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      confirmBtn.textContent = '❌ Verification failed';
      confirmBtn.style.backgroundColor = '#dc3545';
      
      setTimeout(() => {
        confirmBtn.textContent = 'I\'ve Paid';
        confirmBtn.style.pointerEvents = 'auto';
        confirmBtn.style.opacity = '1';
        confirmBtn.style.backgroundColor = '';
      }, 3000);
    }
  }

  async checkBlockchainPayment() {
    // 根据网络类型选择API
    const apis = this.walletConfig.network === 'xlayer' 
      ? [
          () => this.checkWithXLayerRPC(),
          () => this.checkWithXLayerExplorer(),
          () => this.checkWithPolygonScan(),
        ]
      : [
          () => this.checkWithEtherscan(),
          () => this.checkWithCovalent(),
          () => this.checkWithBlockCypher(),
        ];
    
    for (const api of apis) {
      try {
        const result = await api();
        if (result) {
          console.log('✅ Payment verified via blockchain API');
          return true;
        }
      } catch (error) {
        console.warn('API check failed:', error);
        continue;
      }
    }
    
    return false;
  }

  async checkWithXLayerRPC() {
    // X Layer RPC直接查询
    const response = await fetch(this.walletConfig.rpcUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_getLogs',
        params: [{
          fromBlock: 'latest',
          toBlock: 'latest',
          address: '0x55d398326f99059fF775485246999027B3197955', // X Layer USDT合约地址
          topics: [
            '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', // Transfer事件
            null,
            null,
            this.walletConfig.address.toLowerCase().replace('0x', '0x000000000000000000000000')
          ]
        }],
        id: 1
      })
    });
    
    if (!response.ok) throw new Error('X Layer RPC error');
    
    const data = await response.json();
    return data.result && data.result.length > 0;
  }

  async checkWithXLayerExplorer() {
    // X Layer区块浏览器API
    const response = await fetch(`https://www.oklink.com/api/v5/explorer/address/transaction-list?chainShortName=xlayer&address=${this.walletConfig.address}&limit=20`);
    
    if (!response.ok) throw new Error('X Layer Explorer API error');
    
    const data = await response.json();
    if (data.code !== '0') throw new Error('X Layer Explorer API error');
    
    const recentTxs = data.data.filter(tx => {
      const txTime = new Date(tx.blockTime);
      const now = new Date();
      const timeDiff = now - txTime;
      return timeDiff < 300000; // 5分钟内
    });
    
    return recentTxs.length > 0;
  }

  async checkWithPolygonScan() {
    // PolygonScan API (X Layer基于Polygon CDK)
    const response = await fetch(`https://api.polygonscan.com/api?module=account&action=tokentx&address=${this.walletConfig.address}&startblock=0&endblock=99999999&sort=desc`);
    
    if (!response.ok) throw new Error('PolygonScan API error');
    
    const data = await response.json();
    if (data.status !== '1') throw new Error('PolygonScan API error');
    
    const recentTxs = data.result.filter(tx => {
      const txTime = new Date(tx.timeStamp * 1000);
      const now = new Date();
      const timeDiff = now - txTime;
      return timeDiff < 300000; // 5分钟内
    });
    
    return recentTxs.length > 0;
  }

  async checkWithEtherscan() {
    // Etherscan公开API检查（无需密钥）
    const response = await fetch(`https://api.etherscan.io/api?module=account&action=tokentx&address=${this.walletConfig.address}&startblock=0&endblock=99999999&sort=desc`);
    
    if (!response.ok) throw new Error('Etherscan API error');
    
    const data = await response.json();
    if (data.status !== '1') throw new Error('Etherscan API error');
    
    const recentTxs = data.result.filter(tx => {
      const txTime = new Date(tx.timeStamp * 1000);
      const now = new Date();
      const timeDiff = now - txTime;
      return timeDiff < 300000; // 5分钟内
    });
    
    return recentTxs.length > 0;
  }

  async checkWithCovalent() {
    // Covalent公开API检查（无需密钥）
    const response = await fetch(`https://api.covalenthq.com/v1/1/address/${this.walletConfig.address}/transactions_v2/?key=ckey_demo`);
    
    if (!response.ok) throw new Error('Covalent API error');
    
    const data = await response.json();
    if (data.error) throw new Error('Covalent API error');
    
    const recentTxs = data.data.items.filter(tx => {
      const txTime = new Date(tx.block_signed_at);
      const now = new Date();
      const timeDiff = now - txTime;
      return timeDiff < 300000; // 5分钟内
    });
    
    return recentTxs.length > 0;
  }

  async checkWithBlockCypher() {
    // BlockCypher公开API检查（无需密钥）
    const response = await fetch(`https://api.blockcypher.com/v1/eth/main/addrs/${this.walletConfig.address}/txs`);
    
    if (!response.ok) throw new Error('BlockCypher API error');
    
    const data = await response.json();
    if (data.error) throw new Error('BlockCypher API error');
    
    const recentTxs = data.filter(tx => {
      const txTime = new Date(tx.confirmed);
      const now = new Date();
      const timeDiff = now - txTime;
      return timeDiff < 300000; // 5分钟内
    });
    
    return recentTxs.length > 0;
  }

  grantAccess() {
    // 访问验证成功后，加载页面组件
    if (window.ComponentManager) {
      console.log('🔓 访问验证成功，开始加载页面组件...');
      window.ComponentManager.loadByPageType();
    }
  }
}

customElements.define('password-protection', PasswordProtection);
