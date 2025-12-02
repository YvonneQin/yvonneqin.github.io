// Project Data Management Module
const ProjectData = {

  // Tinkering Project
  TLDW: {
    title: 'TLDW',
    badges: ['Tinkering', 'Product Design', 'Worker'],
    period: 'Fresh Start',
    role: 'PM & Deveplorer',
    duration: '--',
    category: 'tinkering_project'
  },
  gesture: {
    title: 'Gesture-Based Web Scroller',
    badges: ['Tinkering', 'Product Design', 'Worker'],
    period: 'Fresh Start',
    role: 'PM & Deveplorer',
    duration: '--',
    category: 'tinkering_project'
  },
  // Tinkering Project
  quant: {
    title: 'Quant Knowledge Visualization',
    badges: ['Tinkering', 'Product Design', 'Pages'],
    period: 'Fresh Start',
    role: 'PM & Deveplorer',
    duration: '--',
    category: 'tinkering_project'
  },
  // REDcity Project
  redcity: {
    title: 'REDcity v1.0 IM/AI Framework Design for Enterprise Productivity Suite',
    badges: ['0 to 1', 'Framework', 'Guidelines'],
    period: '2024.01 - 2024.05',
    role: 'Researcher & Designer',
    duration: '20 mins',
    category: 'product_initiative'
  },
  
  // Construct Project
  construct: {
    title: 'Construct Product Design 0 to 1 Case Retro Sharing',
    badges: ['0 to 1', 'Product Design', 'Product Strategy'],
    period: '2021.04 - 2023.11',
    role: 'Researcher & Designer',
    duration: '20 mins',
    category: 'product_initiative'
  },
  
  // DCT Project
  dct: {
    title: 'Comprehensive CX Solution for Clinical Trials',
    badges: ['Service Design', 'Hardware Design'],
    period: '2022.12 - 2023.11',
    role: 'Researcher & Designer',
    duration: '20 mins',
    category: 'product_initiative'
  },
  
  // AI Project
  ai: {
    title: 'LLM-Based Experience Design',
    badges: ['Product Design & Strategy'],
    period: '2022.12 - 2023.11',
    role: 'Designer & Researcher',
    duration: '20 mins',
    category: 'product_initiative'
  },
  
  // MM Project
  mm: {
    title: 'Medical Monitoring Config Benchmarking Analysis',
    badges: ['Benchmarking Analysis', 'Product Design'],
    period: '2022.12 - 2023.11',
    role: 'Researcher & Designer',
    duration: '20 mins',
    category: 'product_initiative'
  },
  
  // POC Project
  poc: {
    title: 'Spinning the wheel of Product Growth by Design & Insight - Sneak Peak to Narratives POC demo',
    badges: ['Product Design', 'Rapid Prototype'],
    period: '2022.12 - 2023.11',
    role: 'Researcher & Designer',
    duration: '20 mins',
    category: 'side_project'
  },
  
  // Law Project
  law: {
    title: 'Building a 0-to-1 Smart Legal Product Experience System (Ping An)',
    badges: ['Product', 'Interaction', 'User Research'],
    period: 'Mar 2020 - Jul 2020',
    role: 'Product Designer',
    duration: '20 mins',
    category: 'product_initiative'
  },
  
  // Askbob Project
  askbob: {
    title: 'AskBob Intelligent Office Assistant — Voice Conversation Enhancements',
    badges: ['Interaction', 'User Research'],
    period: 'Jan 2019 - Mar 2020',
    role: 'Product Designer',
    duration: '20 mins',
    category: 'product_initiative'
  },
  
  // Graduate Project
  graduate: {
    title: 'Graduation Project — Motion-Sensing Product-Service System for People with Disabilities',
    badges: ['Smart Hardware', 'Interaction'],
    period: 'Jan 2016',
    role: 'Student',
    duration: '20 mins',
    category: 'side_project'
  },
  
  // COE Project
  coe: {
    title: 'CoE Workshop Experts Lecture Series — Visual Design for Promotional Materials',
    badges: ['Visual'],
    period: 'Oct 2019 - Jan 2020',
    role: 'Product Designer',
    duration: '20 mins',
    category: 'side_project'
  }
};

// Automatically update project information on pages
function updateProjectInfo() {
  // Find all elements with data-project attribute
  const projectElements = document.querySelectorAll('[data-project]');
  
  projectElements.forEach(element => {
    const projectKey = element.getAttribute('data-project');
    const project = ProjectData[projectKey];
    
    if (!project) {
      console.warn(`Project data not found for: ${projectKey}`);
      return;
    }
    
    // Update content based on element type
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
          // Complete project information (including title, tags, details)
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
          // Compact version (for homepage)
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

// Automatically execute after page loads
document.addEventListener('DOMContentLoaded', updateProjectInfo);

// Export for use by other modules
window.ProjectData = ProjectData;
window.updateProjectInfo = updateProjectInfo;
