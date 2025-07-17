import { ResumeData, ResumeTheme } from '../types/resume';
import { exportToExcel } from './excelExport';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ModernTemplate from '../components/Templates/ModernTemplate';
import ProfessionalTemplate from '../components/Templates/ProfessionalTemplate';
import CreativeTemplate from '../components/Templates/CreativeTemplate';
import AcademicTemplate from '../components/Templates/LaTeX/AcademicTemplate';
import ClassicTemplate from '../components/Templates/LaTeX/ClassicTemplate';
import MinimalTemplate from '../components/Templates/LaTeX/MinimalTemplate';
import ElegantTemplate from '../components/Templates/LaTeX/ElegantTemplate';
import CompactTemplate from '../components/Templates/LaTeX/CompactTemplate';

export const exportToPDF = async () => {
  const previewElement = document.getElementById('resume-preview-container');
  if (!previewElement) return;

  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const styles = Array.from(document.styleSheets)
    .map(styleSheet => {
      try {
        return Array.from(styleSheet.cssRules)
          .map(rule => rule.cssText)
          .join('');
      } catch (e) {
        console.log('Could not read stylesheet rules:', e);
        return '';
      }
    })
    .join('');

  printWindow.document.write(`
    <html>
      <head>
        <title>Resume</title>
        <style>
          ${styles}
          @media print {
            body {
              -webkit-print-color-adjust: exact;
              color-adjust: exact;
            }
          }
        </style>
      </head>
      <body>
        ${previewElement.innerHTML}
      </body>
    </html>
  `);

  printWindow.document.close();
  
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 500);
};

const getTemplateComponent = (template: string) => {
  switch (template) {
    case 'modern':
      return ModernTemplate;
    case 'professional':
      return ProfessionalTemplate;
    case 'creative':
      return CreativeTemplate;
    case 'academic':
      return AcademicTemplate;
    case 'classic':
      return ClassicTemplate;
    case 'minimal':
      return MinimalTemplate;
    case 'elegant':
      return ElegantTemplate;
    case 'compact':
      return CompactTemplate;
    default:
      return ModernTemplate;
  }
};

export const exportToHTML = (data: ResumeData, theme: ResumeTheme) => {
  const html = generateResumeHTML(data, theme);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `${data.personalInfo.firstName}_${data.personalInfo.lastName}_Resume.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportToWord = (data: ResumeData, theme: ResumeTheme) => {
  const html = generateResumeHTML(data, theme);
  const blob = new Blob([html], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `${data.personalInfo.firstName}_${data.personalInfo.lastName}_Resume.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportToExcelFormatted = (data: ResumeData, theme: ResumeTheme, templateName: string = 'professional') => {
  exportToExcel(data, theme, templateName);
};

const generateResumeHTML = (data: ResumeData, theme: ResumeTheme): string => {
  const { personalInfo, summary, workExperience, education, skills, certifications, projects, languages, awards } = data;
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };
  
  const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  return `
    <div class="resume-container">
      <div class="header">
        <h1>${personalInfo.firstName} ${personalInfo.lastName}</h1>
        <div class="contact-info">
          <span>${personalInfo.email}</span>
          <span>${personalInfo.phone}</span>
          <span>${personalInfo.location}</span>
          ${personalInfo.website ? `<span>${personalInfo.website}</span>` : ''}
        </div>
      </div>

      ${summary ? `
        <div class="section">
          <h2 class="section-title">Professional Summary</h2>
          <p>${summary}</p>
        </div>
      ` : ''}

      ${workExperience.length > 0 ? `
        <div class="section">
          <h2 class="section-title">Work Experience</h2>
          ${workExperience.map(exp => `
            <div class="experience-item">
              <div class="item-header">
                <div>
                  <div class="item-title">${exp.position}</div>
                  <div class="item-company">${exp.company} - ${exp.location}</div>
                </div>
                <div class="item-date">${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}</div>
              </div>
              <p>${exp.description}</p>
              ${exp.achievements.filter(Boolean).length > 0 ? `
                <ul class="achievement-list">
                  ${exp.achievements.filter(Boolean).map(achievement => `<li>${achievement}</li>`).join('')}
                </ul>
              ` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${education.length > 0 ? `
        <div class="section">
          <h2 class="section-title">Education</h2>
          ${education.map(edu => `
            <div class="education-item">
              <div class="item-header">
                <div>
                  <div class="item-title">${edu.degree} in ${edu.field}</div>
                  <div class="item-company">${edu.institution} - ${edu.location}</div>
                  ${edu.gpa ? `<div>GPA: ${edu.gpa}</div>` : ''}
                  ${edu.honors ? `<div>${edu.honors}</div>` : ''}
                </div>
                <div class="item-date">${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}</div>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${skills.length > 0 ? `
        <div class="section">
          <h2 class="section-title">Skills</h2>
          <div class="skills-grid">
            ${['Technical', 'Soft', 'Language'].map(category => {
              const categorySkills = getSkillsByCategory(category);
              return categorySkills.length > 0 ? `
                <div class="skill-category">
                  <h4>${category === 'Technical' ? 'Technical Skills' : category === 'Soft' ? 'Soft Skills' : 'Languages'}</h4>
                  ${categorySkills.map(skill => `
                    <div class="skill-item">
                      <span>${skill.name}</span>
                      <span>${skill.level}</span>
                    </div>
                  `).join('')}
                </div>
              ` : '';
            }).join('')}
          </div>
        </div>
      ` : ''}

      ${projects.length > 0 ? `
        <div class="section">
          <h2 class="section-title">Projects</h2>
          ${projects.map(project => `
            <div class="experience-item">
              <div class="item-header">
                <div>
                  <div class="item-title">${project.name}</div>
                </div>
                <div class="item-date">${formatDate(project.startDate)} - ${formatDate(project.endDate)}</div>
              </div>
              <p>${project.description}</p>
              ${project.technologies.length > 0 ? `
                <div style="margin-top: 10px;">
                  <strong>Technologies:</strong> ${project.technologies.join(', ')}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${certifications.length > 0 ? `
        <div class="section">
          <h2 class="section-title">Certifications</h2>
          ${certifications.map(cert => `
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

      ${awards.length > 0 ? `
        <div class="section">
          <h2 class="section-title">Awards & Achievements</h2>
          ${awards.map(award => `
            <div class="education-item">
              <div class="item-header">
                <div>
                  <div class="item-title">${award.name}</div>
                  <div class="item-company">${award.issuer}</div>
                  <p>${award.description}</p>
                </div>
                <div class="item-date">${award.date}</div>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;
};
