import { ResumeContent, Template } from '../types';

export const exportToPDF = async (content: ResumeContent, template: Template): Promise<void> => {
  // Create a new window with the resume content
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to export PDF');
    return;
  }

  const htmlContent = generatePrintableHTML(content, template);
  
  printWindow.document.write(htmlContent);
  printWindow.document.close();
  
  // Wait for content to load, then print
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };
};

const generatePrintableHTML = (content: ResumeContent, template: Template): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${content.personalInfo.fullName} - Resume</title>
      <style>
        @media print {
          @page {
            margin: 0.5in;
            size: A4;
          }
        }
        
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.4;
          color: #333;
          max-width: 8.5in;
          margin: 0 auto;
          padding: 0;
          background: white;
        }
        
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #2563eb;
        }
        
        .name {
          font-size: 28px;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 10px;
        }
        
        .contact-info {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.6;
        }
        
        .section {
          margin-bottom: 25px;
        }
        
        .section-title {
          font-size: 18px;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 15px;
          padding-bottom: 5px;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .experience-item, .education-item {
          margin-bottom: 20px;
        }
        
        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
        }
        
        .item-title {
          font-weight: bold;
          color: #1f2937;
        }
        
        .item-company {
          color: #6b7280;
          font-size: 14px;
        }
        
        .item-date {
          color: #9ca3af;
          font-size: 12px;
          text-align: right;
        }
        
        .item-description {
          margin-top: 8px;
        }
        
        .item-description ul {
          margin: 0;
          padding-left: 20px;
        }
        
        .item-description li {
          margin-bottom: 4px;
          font-size: 14px;
          line-height: 1.4;
        }
        
        .skills-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .skill-tag {
          background: #f3f4f6;
          color: #374151;
          padding: 4px 12px;
          border-radius: 16px;
          font-size: 12px;
          border: 1px solid #d1d5db;
        }
        
        .projects-grid {
          display: grid;
          gap: 15px;
        }
        
        .project-item {
          border: 1px solid #e5e7eb;
          padding: 15px;
          border-radius: 8px;
        }
        
        .project-title {
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 8px;
        }
        
        .project-tech {
          color: #6b7280;
          font-size: 12px;
          margin-top: 8px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="name">${content.personalInfo.fullName}</div>
        <div class="contact-info">
          ${content.personalInfo.email} • ${content.personalInfo.phone}<br>
          ${content.personalInfo.location}
          ${content.personalInfo.linkedIn ? ` • ${content.personalInfo.linkedIn}` : ''}
          ${content.personalInfo.website ? ` • ${content.personalInfo.website}` : ''}
        </div>
      </div>

      ${content.personalInfo.summary ? `
        <div class="section">
          <div class="section-title">Professional Summary</div>
          <p>${content.personalInfo.summary}</p>
        </div>
      ` : ''}

      ${content.experience.length > 0 ? `
        <div class="section">
          <div class="section-title">Work Experience</div>
          ${content.experience.map(exp => `
            <div class="experience-item">
              <div class="item-header">
                <div>
                  <div class="item-title">${exp.position}</div>
                  <div class="item-company">${exp.company} • ${exp.location}</div>
                </div>
                <div class="item-date">
                  ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}
                </div>
              </div>
              <div class="item-description">
                <ul>
                  ${exp.description.map(desc => `<li>${desc}</li>`).join('')}
                </ul>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${content.education.length > 0 ? `
        <div class="section">
          <div class="section-title">Education</div>
          ${content.education.map(edu => `
            <div class="education-item">
              <div class="item-header">
                <div>
                  <div class="item-title">${edu.degree} in ${edu.field}</div>
                  <div class="item-company">${edu.institution}</div>
                  ${edu.gpa ? `<div class="item-company">GPA: ${edu.gpa}</div>` : ''}
                </div>
                <div class="item-date">
                  ${edu.startDate} - ${edu.endDate}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${content.skills.length > 0 ? `
        <div class="section">
          <div class="section-title">Skills</div>
          <div class="skills-container">
            ${content.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
          </div>
        </div>
      ` : ''}

      ${content.projects.length > 0 ? `
        <div class="section">
          <div class="section-title">Projects</div>
          <div class="projects-grid">
            ${content.projects.map(project => `
              <div class="project-item">
                <div class="project-title">${project.name}</div>
                <p>${project.description}</p>
                ${project.technologies.length > 0 ? `
                  <div class="project-tech">Technologies: ${project.technologies.join(', ')}</div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${content.certifications.length > 0 ? `
        <div class="section">
          <div class="section-title">Certifications</div>
          ${content.certifications.map(cert => `
            <div class="education-item">
              <div class="item-header">
                <div>
                  <div class="item-title">${cert.name}</div>
                  <div class="item-company">${cert.issuer}</div>
                </div>
                <div class="item-date">${cert.date}</div>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}
    </body>
    </html>
  `;
};