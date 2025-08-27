// 项目数据管理模块
const ProjectData = {
  // REDcity 项目
  redcity: {
    title: 'REDcity v1.0 IM/AI Framework Design for Enterprise Productivity Suite',
    badges: ['0 to 1', 'Framework', 'Guidelines'],
    period: '2024.01 - 2024.05',
    role: 'Researcher & Designer',
    duration: '20 mins'
  },
  
  // Construct 项目
  construct: {
    title: 'Construct Product Design 0 to 1 Case Retro Sharing',
    badges: ['0 to 1', 'Product Design', 'Product Strategy'],
    period: '2021.04 - 2023.11',
    role: 'Researcher & Designer',
    duration: '20 mins'
  },
  
  // DCT 项目
  dct: {
    title: 'Comprehensive CX Solution for Clinical Trials',
    badges: ['Service Design', 'Hardware Design'],
    period: '2022.12 - 2023.11',
    role: 'Researcher & Designer',
    duration: '20 mins'
  },
  
  // AI 项目
  ai: {
    title: 'LLM-Based Experience Design',
    badges: ['Product Design & Strategy'],
    period: '2022.12 - 2023.11',
    role: 'Designer & Researcher',
    duration: '20 mins'
  },
  
  // MM 项目
  mm: {
    title: 'Medical Monitoring Config Benchmarking Analysis',
    badges: ['Benchmarking Analysis', 'Product Design'],
    period: '2022.12 - 2023.11',
    role: 'Researcher & Designer',
    duration: '20 mins'
  },
  
  // POC 项目
  poc: {
    title: 'Spinning the wheel of Product Growth by Design & Insight - Sneak Peak to Narratives POC demo',
    badges: ['Product Design', 'Rapid Prototype'],
    period: '2022.12 - 2023.11',
    role: 'Researcher & Designer',
    duration: '20 mins'
  },
  
  // Law 项目
  law: {
    title: 'Building a 0-to-1 Smart Legal Product Experience System (Ping An)',
    badges: ['Product', 'Interaction', 'User Research'],
    period: '2020年3月 - 2020年7月',
    role: 'Product Designer',
    duration: '20 mins'
  },
  
  // Askbob 项目
  askbob: {
    title: 'AskBob Intelligent Office Assistant — Voice Conversation Enhancements',
    badges: ['Interaction', 'User Research'],
    period: '2019年1月 - 2020年3月',
    role: 'Product Designer',
    duration: '20 mins'
  },
  
  // Graduate 项目
  graduate: {
    title: 'Graduation Project — Motion-Sensing Product-Service System for People with Disabilities',
    badges: ['Smart Hardware', 'Interaction'],
    period: '2016年1月',
    role: 'Student',
    duration: '20 mins'
  },
  
  // COE 项目
  coe: {
    title: 'CoE Workshop Experts Lecture Series — Visual Design for Promotional Materials',
    badges: ['Visual'],
    period: '2019年10月 - 2020年1月',
    role: 'Product Designer',
    duration: '20 mins'
  }
};

// 自动更新页面中的项目信息
function updateProjectInfo() {
  // 查找所有带有 data-project 属性的元素
  const projectElements = document.querySelectorAll('[data-project]');
  
  projectElements.forEach(element => {
    const projectKey = element.getAttribute('data-project');
    const project = ProjectData[projectKey];
    
    if (!project) {
      console.warn(`Project data not found for: ${projectKey}`);
      return;
    }
    
    // 根据元素类型更新内容
    if (element.hasAttribute('data-type')) {
      const type = element.getAttribute('data-type');
      
      switch (type) {
        case 'title':
          element.textContent = project.title;
          break;
        case 'badges':
          element.innerHTML = project.badges.map(badge => `<badge-tag>${badge}</badge-tag>`).join('');
          break;
        case 'details':
          element.innerHTML = `
            ${project.period}<br />
            ${project.role}<br />
            ${project.duration}
          `;
          break;
        case 'full':
          // 完整项目信息（包括标题、标签、详情）
          element.innerHTML = `
            ${project.badges.map(badge => `<badge-tag>${badge}</badge-tag>`).join('')}
            <h3 style="margin-top: 16px;">${project.title}</h3>
            <p class="lead">
              ${project.period}<br />
              ${project.role}<br />
              ${project.duration}
            </p>
          `;
          break;
        case 'compact':
          // 紧凑版本（用于首页）
          element.innerHTML = `
            ${project.badges.map(badge => `<badge-tag>${badge}</badge-tag>`).join('')}
            <h3>${project.title}</h3>
            <p class="lead" style="padding-top: 0px;margin-bottom: 8px;">
              ${project.period}<br />
              ${project.role}<br />
            </p>
          `;
          break;
      }
    }
  });
}

// 页面加载完成后自动执行
document.addEventListener('DOMContentLoaded', updateProjectInfo);

// 导出供其他模块使用
window.ProjectData = ProjectData;
window.updateProjectInfo = updateProjectInfo;
