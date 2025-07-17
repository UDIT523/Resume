import { ResumeData, ResumeTheme } from '../types/resume';
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
  const previewElement = document.getElementById('resume-preview-container');
  if (!previewElement) return;

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

  const html = `
    <html>
      <head>
        <title>Resume</title>
        <style>${styles}</style>
      </head>
      <body>
        <div style="width: 8.5in; height: 11in; margin: auto;">
          ${previewElement.innerHTML}
        </div>
      </body>
    </html>
  `;

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
  const previewElement = document.getElementById('resume-preview-container');
  if (!previewElement) return;

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

  const html = `
    <html>
      <head>
        <title>Resume</title>
        <style>${styles}</style>
      </head>
      <body>
        ${previewElement.innerHTML}
      </body>
    </html>
  `;

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
