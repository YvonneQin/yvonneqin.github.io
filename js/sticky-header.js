/**
 * Sticky Header 功能
 * 支持动态创建的header组件
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
    
    // 如果header已经存在，直接初始化
    if (this.header) {
      this.initSticky();
    } else {
      // 如果header还不存在，等待它创建完成
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
});

// 导出类供其他模块使用
window.StickyHeader = StickyHeader;