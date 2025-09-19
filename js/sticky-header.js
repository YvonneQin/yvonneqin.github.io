/**
 * Sticky Header Functionality
 * Supports dynamically created header components
 */
class StickyHeader {
  constructor(headerElement) {
    this.header = headerElement;
    this.body = document.querySelector("body");
    this.thresholdPosition = 15;
    this.triggeredStickyClass = "header--sticky-triggered";
    this.stickyClass = "header--sticky";
    this.ticking = false;
    this.bodyPosition = 0;
    
    // If header already exists, initialize directly
    if (this.header) {
      this.initSticky();
    } else {
      // If header doesn't exist yet, wait for it to be created
      this.waitForHeader();
    }
  }

  waitForHeader() {
    // 使用MutationObserver监听DOM变化，等待header组件创建完成
    const observer = new MutationObserver((mutations) => {
      const header = document.querySelector(".header");
      if (header && !this.header) {
        this.header = header;
        observer.disconnect();
        this.initSticky();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // 备用方案：定期检查
    setTimeout(() => {
      if (!this.header) {
        const header = document.querySelector(".header");
        if (header) {
          this.header = header;
          this.initSticky();
        }
      }
    }, 100);
  }

  initSticky() {
    if (!this.header) return;
    
    this.headerStaticHeight = this.header.getBoundingClientRect().height;
    this.header.classList.toggle(this.stickyClass, true);
    
    // 添加滚动事件监听
    window.addEventListener("scroll", () => this.scrollHandler());
    
    // 初始化时检查一次
    this.scrollChanged();
  }

  scrollHandler() {
    if (this.ticking) return;
    
    window.requestAnimationFrame(() => {
      this.scrollChanged();
      this.ticking = false;
    });
    
    this.ticking = true;
  }

  scrollChanged() {
    if (!this.header) return;
    
    this.bodyPosition = Math.abs(this.body.getBoundingClientRect().top);
    
    if (this.bodyPosition > this.thresholdPosition) {
      this.header.classList.toggle(this.triggeredStickyClass, true);
    } else {
      this.header.classList.toggle(this.triggeredStickyClass, false);
    }
  }
}

// 创建全局函数，供header组件调用
window.initStickyHeader = function() {
  const header = document.querySelector(".header");
  if (header) {
    new StickyHeader(header);
  }
};

// 自动初始化（如果header已经存在）
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector(".header");
  if (header) {
    new StickyHeader(header);
  }

  // Dark mode toggle with persistence
  const htmlEl = document.documentElement;
  const storedTheme = localStorage.getItem('theme');
  const isInitiallyDark = storedTheme ? (storedTheme === 'dark') : true; // default to dark
  if (isInitiallyDark) {
    htmlEl.classList.add('dark');
    if (!storedTheme) localStorage.setItem('theme', 'dark');
  } else {
    htmlEl.classList.remove('dark');
  }

  // Create or find a toggle button with data-theme-toggle
  let themeToggle = document.querySelector('[data-theme-toggle]');
  if (!themeToggle) {
    themeToggle = document.createElement('button');
    themeToggle.type = 'button';
    themeToggle.setAttribute('data-theme-toggle', 'true');
    themeToggle.className = 'btn btn-frameless btn-sm';
    themeToggle.style.marginLeft = '8px';
    themeToggle.textContent = htmlEl.classList.contains('dark') ? 'Light' : 'Dark';
    // Try to inject into header right area
    const host = document.querySelector('.header .navbar') || header || document.body;
    host.appendChild(themeToggle);
  }

  themeToggle.addEventListener('click', () => {
    const isDark = htmlEl.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? 'Light' : 'Dark';
  });
});

// 导出类供其他模块使用
window.StickyHeader = StickyHeader;