// 网站配置文件
window.SiteConfig = {
  // iconfont配置
  iconfont: {
    // 主要iconfont链接
    primary: 'https://at.alicdn.com/t/c/font_4545731_1iwxww92za1.css',
    // 备用iconfont链接（如果需要）
    fallback: 'https://at.alicdn.com/t/c/font_4545731_3pnlmzv33e7.css',
    // 预连接域名
    preconnect: 'https://at.alicdn.com'
  },
  
  // 其他配置
  site: {
    name: 'Yuwen Qin',
    url: 'https://yvonneqin.github.io',
    description: 'Experience Imagineer & Individual Developer'
  }
};

// 自动加载iconfont
(function() {
  const config = window.SiteConfig.iconfont;
  
  // 添加预连接
  const preconnect = document.createElement('link');
  preconnect.rel = 'preconnect';
  preconnect.href = config.preconnect;
  preconnect.crossOrigin = 'anonymous';
  document.head.appendChild(preconnect);
  
  // 加载主要iconfont
  const iconfont = document.createElement('link');
  iconfont.rel = 'stylesheet';
  iconfont.href = config.primary;
  iconfont.onerror = function() {
    // 如果主要链接失败，尝试备用链接
    if (config.fallback) {
      this.href = config.fallback;
    }
  };
  document.head.appendChild(iconfont);
})();
