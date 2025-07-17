import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { ResumeData, ResumeTheme } from '../types/resume';

interface ExcelTemplate {
  name: string;
  workbook: XLSX.WorkBook;
  cellMappings: {
    [key: string]: string; // Maps data fields to Excel cell addresses
  };
}

// Define cell mappings for different resume templates
const TEMPLATE_MAPPINGS = {
  professional: {
    // Personal Information
    firstName: 'B2',
    lastName: 'C2',
    fullName: 'B2:C2', // Merged cell
    email: 'B3',
    phone: 'B4',
    location: 'B5',
    website: 'B6',
    linkedin: 'B7',
    github: 'B8',
    
    // Summary
    summary: 'B10:F13', // Multi-cell range for text wrapping
    
    // Work Experience (dynamic rows starting from row 16)
    experienceStart: 16,
    experienceColumns: {
      position: 'B',
      company: 'C',
      location: 'D',
      startDate: 'E',
      endDate: 'F',
      description: 'B', // Next row, spans B:F
      achievements: 'B' // Following rows, spans B:F
    },
    
    // Education (starting from row 30)
    educationStart: 30,
    educationColumns: {
      degree: 'B',
      field: 'C',
      institution: 'D',
      location: 'E',
      graduationDate: 'F',
      gpa: 'G',
      honors: 'H'
    },
    
    // Skills (starting from row 40)
    skillsStart: 40,
    skillsColumns: {
      technical: 'B40:D45',
      soft: 'E40:G45',
      languages: 'H40:J45'
    }
  },
  
  modern: {
    // Different layout for modern template
    firstName: 'A1',
    lastName: 'B1',
    email: 'A2',
    phone: 'B2',
    location: 'A3:B3',
    summary: 'A5:H8',
    experienceStart: 10,
    educationStart: 25,
    skillsStart: 35
  },
  
  academic: {
    // Academic CV layout
    fullName: 'D1:F1',
    email: 'D2',
    phone: 'E2',
    location: 'F2',
    summary: 'A4:H7',
    educationStart: 9, // Education comes first in academic CVs
    experienceStart: 20,
    skillsStart: 35
  }
};

class ExcelExporter {
  private workbook: XLSX.WorkBook;
  private worksheet: XLSX.WorkSheet;
  private templateName: string;
  private cellMappings: any;

  constructor(templateName: string = 'professional') {
    this.templateName = templateName;
    this.cellMappings = TEMPLATE_MAPPINGS[templateName as keyof typeof TEMPLATE_MAPPINGS] || TEMPLATE_MAPPINGS.professional;
    this.initializeTemplate();
  }

  private initializeTemplate() {
    // Create a new workbook with pre-formatted template
    this.workbook = XLSX.utils.book_new();
    this.worksheet = this.createFormattedWorksheet();
    XLSX.utils.book_append_sheet(this.workbook, this.worksheet, 'Resume');
  }

  private createFormattedWorksheet(): XLSX.WorkSheet {
    const ws: XLSX.WorkSheet = {};
    
    // Set column widths
    ws['!cols'] = [
      { wch: 15 }, // A
      { wch: 20 }, // B
      { wch: 20 }, // C
      { wch: 15 }, // D
      { wch: 12 }, // E
      { wch: 12 }, // F
      { wch: 15 }, // G
      { wch: 20 }  // H
    ];

    // Create template structure based on template type
    this.createTemplateStructure(ws);
    
    return ws;
  }

  private createTemplateStructure(ws: XLSX.WorkSheet) {
    switch (this.templateName) {
      case 'professional':
        this.createProfessionalTemplate(ws);
        break;
      case 'modern':
        this.createModernTemplate(ws);
        break;
      case 'academic':
        this.createAcademicTemplate(ws);
        break;
      default:
        this.createProfessionalTemplate(ws);
    }
  }

  private createProfessionalTemplate(ws: XLSX.WorkSheet) {
    // Header section with formatting
    this.setCellWithStyle(ws, 'A1', 'PROFESSIONAL RESUME', {
      font: { bold: true, size: 16, color: { rgb: '2563EB' } },
      alignment: { horizontal: 'center' },
      fill: { fgColor: { rgb: 'F3F4F6' } }
    });
    
    // Merge header cells
    ws['!merges'] = [
      { s: { c: 0, r: 0 }, e: { c: 7, r: 0 } }, // Header
      { s: { c: 1, r: 1 }, e: { c: 2, r: 1 } }, // Full name
    ];

    // Personal Information Labels
    this.setCellWithStyle(ws, 'A2', 'Name:', { font: { bold: true } });
    this.setCellWithStyle(ws, 'A3', 'Email:', { font: { bold: true } });
    this.setCellWithStyle(ws, 'A4', 'Phone:', { font: { bold: true } });
    this.setCellWithStyle(ws, 'A5', 'Location:', { font: { bold: true } });
    this.setCellWithStyle(ws, 'A6', 'Website:', { font: { bold: true } });
    this.setCellWithStyle(ws, 'A7', 'LinkedIn:', { font: { bold: true } });
    this.setCellWithStyle(ws, 'A8', 'GitHub:', { font: { bold: true } });

    // Section Headers
    this.setCellWithStyle(ws, 'A10', 'PROFESSIONAL SUMMARY', {
      font: { bold: true, size: 12, color: { rgb: '2563EB' } },
      fill: { fgColor: { rgb: 'EBF4FF' } }
    });

    this.setCellWithStyle(ws, 'A15', 'WORK EXPERIENCE', {
      font: { bold: true, size: 12, color: { rgb: '2563EB' } },
      fill: { fgColor: { rgb: 'EBF4FF' } }
    });

    this.setCellWithStyle(ws, 'A29', 'EDUCATION', {
      font: { bold: true, size: 12, color: { rgb: '2563EB' } },
      fill: { fgColor: { rgb: 'EBF4FF' } }
    });

    this.setCellWithStyle(ws, 'A39', 'SKILLS', {
      font: { bold: true, size: 12, color: { rgb: '2563EB' } },
      fill: { fgColor: { rgb: 'EBF4FF' } }
    });

    // Add borders to sections
    this.addSectionBorders(ws);
  }

  private createModernTemplate(ws: XLSX.WorkSheet) {
    // Modern template with sidebar layout
    this.setCellWithStyle(ws, 'A1', 'MODERN RESUME', {
      font: { bold: true, size: 18, color: { rgb: 'FFFFFF' } },
      fill: { fgColor: { rgb: '1F2937' } },
      alignment: { horizontal: 'center' }
    });

    // Sidebar background (columns A-B)
    for (let row = 1; row <= 50; row++) {
      this.setCellWithStyle(ws, `A${row}`, '', {
        fill: { fgColor: { rgb: 'F9FAFB' } }
      });
      this.setCellWithStyle(ws, `B${row}`, '', {
        fill: { fgColor: { rgb: 'F9FAFB' } }
      });
    }
  }

  private createAcademicTemplate(ws: XLSX.WorkSheet) {
    // Academic CV template
    this.setCellWithStyle(ws, 'A1', 'CURRICULUM VITAE', {
      font: { bold: true, size: 16, name: 'Times New Roman' },
      alignment: { horizontal: 'center' }
    });

    // Academic sections
    this.setCellWithStyle(ws, 'A8', 'EDUCATION', {
      font: { bold: true, size: 12, name: 'Times New Roman' }
    });

    this.setCellWithStyle(ws, 'A19', 'RESEARCH EXPERIENCE', {
      font: { bold: true, size: 12, name: 'Times New Roman' }
    });

    this.setCellWithStyle(ws, 'A34', 'PUBLICATIONS', {
      font: { bold: true, size: 12, name: 'Times New Roman' }
    });
  }

  private setCellWithStyle(ws: XLSX.WorkSheet, cellAddress: string, value: any, style: any) {
    const cell = { v: value, t: typeof value === 'number' ? 'n' : 's', s: style };
    ws[cellAddress] = cell;
  }

  private addSectionBorders(ws: XLSX.WorkSheet) {
    // Add borders to make sections visually distinct
    const borderStyle = {
      border: {
        top: { style: 'thin', color: { rgb: '000000' } },
        bottom: { style: 'thin', color: { rgb: '000000' } },
        left: { style: 'thin', color: { rgb: '000000' } },
        right: { style: 'thin', color: { rgb: '000000' } }
      }
    };

    // Apply borders to header sections
    ['A1', 'A10', 'A15', 'A29', 'A39'].forEach(cell => {
      if (ws[cell]) {
        ws[cell].s = { ...ws[cell].s, ...borderStyle };
      }
    });
  }

  public populateData(data: ResumeData, theme: ResumeTheme) {
    // Personal Information
    this.populatePersonalInfo(data.personalInfo);
    
    // Summary
    this.populateSummary(data.summary);
    
    // Work Experience
    this.populateWorkExperience(data.workExperience);
    
    // Education
    this.populateEducation(data.education);
    
    // Skills
    this.populateSkills(data.skills);
    
    // Projects
    this.populateProjects(data.projects);
    
    // Certifications
    this.populateCertifications(data.certifications);
    
    // Awards
    this.populateAwards(data.awards);
    
    // Apply theme colors
    this.applyTheme(theme);
  }

  private populatePersonalInfo(personalInfo: any) {
    const mappings = this.cellMappings;
    
    if (mappings.fullName) {
      this.setCellWithStyle(this.worksheet, mappings.fullName.split(':')[0], 
        `${personalInfo.firstName} ${personalInfo.lastName}`, 
        { font: { bold: true, size: 14 } }
      );
    } else {
      if (mappings.firstName) this.worksheet[mappings.firstName] = { v: personalInfo.firstName, t: 's' };
      if (mappings.lastName) this.worksheet[mappings.lastName] = { v: personalInfo.lastName, t: 's' };
    }
    
    if (mappings.email) this.worksheet[mappings.email] = { v: personalInfo.email, t: 's' };
    if (mappings.phone) this.worksheet[mappings.phone] = { v: personalInfo.phone, t: 's' };
    if (mappings.location) this.worksheet[mappings.location] = { v: personalInfo.location, t: 's' };
    if (mappings.website && personalInfo.website) this.worksheet[mappings.website] = { v: personalInfo.website, t: 's' };
    if (mappings.linkedin && personalInfo.linkedin) this.worksheet[mappings.linkedin] = { v: personalInfo.linkedin, t: 's' };
    if (mappings.github && personalInfo.github) this.worksheet[mappings.github] = { v: personalInfo.github, t: 's' };
  }

  private populateSummary(summary: string) {
    if (summary && this.cellMappings.summary) {
      const cellAddress = this.cellMappings.summary.split(':')[0];
      this.setCellWithStyle(this.worksheet, cellAddress, summary, {
        alignment: { wrapText: true, vertical: 'top' }
      });
    }
  }

  private populateWorkExperience(workExperience: any[]) {
    let currentRow = this.cellMappings.experienceStart || 16;
    const cols = this.cellMappings.experienceColumns;
    
    workExperience.forEach((exp, index) => {
      // Position and company info
      this.worksheet[`${cols.position}${currentRow}`] = { v: exp.position, t: 's', s: { font: { bold: true } } };
      this.worksheet[`${cols.company}${currentRow}`] = { v: exp.company, t: 's' };
      this.worksheet[`${cols.location}${currentRow}`] = { v: exp.location, t: 's' };
      
      // Dates
      const startDate = this.formatDate(exp.startDate);
      const endDate = exp.current ? 'Present' : this.formatDate(exp.endDate);
      this.worksheet[`${cols.startDate}${currentRow}`] = { v: startDate, t: 's' };
      this.worksheet[`${cols.endDate}${currentRow}`] = { v: endDate, t: 's' };
      
      currentRow++;
      
      // Description
      if (exp.description) {
        this.setCellWithStyle(this.worksheet, `${cols.description}${currentRow}`, exp.description, {
          alignment: { wrapText: true }
        });
        currentRow++;
      }
      
      // Achievements
      exp.achievements.filter(Boolean).forEach((achievement: string) => {
        this.worksheet[`${cols.achievements}${currentRow}`] = { 
          v: `• ${achievement}`, 
          t: 's',
          s: { alignment: { wrapText: true } }
        };
        currentRow++;
      });
      
      currentRow++; // Space between experiences
    });
  }

  private populateEducation(education: any[]) {
    let currentRow = this.cellMappings.educationStart || 30;
    const cols = this.cellMappings.educationColumns;
    
    education.forEach((edu) => {
      this.worksheet[`${cols.degree}${currentRow}`] = { v: edu.degree, t: 's', s: { font: { bold: true } } };
      this.worksheet[`${cols.field}${currentRow}`] = { v: edu.field, t: 's' };
      this.worksheet[`${cols.institution}${currentRow}`] = { v: edu.institution, t: 's' };
      this.worksheet[`${cols.location}${currentRow}`] = { v: edu.location, t: 's' };
      this.worksheet[`${cols.graduationDate}${currentRow}`] = { v: this.formatDate(edu.endDate), t: 's' };
      
      if (edu.gpa && cols.gpa) {
        this.worksheet[`${cols.gpa}${currentRow}`] = { v: `GPA: ${edu.gpa}`, t: 's' };
      }
      
      if (edu.honors && cols.honors) {
        this.worksheet[`${cols.honors}${currentRow}`] = { v: edu.honors, t: 's' };
      }
      
      currentRow++;
    });
  }

  private populateSkills(skills: any[]) {
    const skillsMapping = this.cellMappings.skillsColumns;
    
    if (skillsMapping) {
      const technicalSkills = skills.filter(s => s.category === 'Technical').map(s => s.name);
      const softSkills = skills.filter(s => s.category === 'Soft').map(s => s.name);
      const languages = skills.filter(s => s.category === 'Language').map(s => s.name);
      
      if (technicalSkills.length > 0) {
        const techCell = skillsMapping.technical.split(':')[0];
        this.setCellWithStyle(this.worksheet, techCell, technicalSkills.join(', '), {
          alignment: { wrapText: true }
        });
      }
      
      if (softSkills.length > 0) {
        const softCell = skillsMapping.soft.split(':')[0];
        this.setCellWithStyle(this.worksheet, softCell, softSkills.join(', '), {
          alignment: { wrapText: true }
        });
      }
      
      if (languages.length > 0) {
        const langCell = skillsMapping.languages.split(':')[0];
        this.setCellWithStyle(this.worksheet, langCell, languages.join(', '), {
          alignment: { wrapText: true }
        });
      }
    }
  }

  private populateProjects(projects: any[]) {
    // Add projects section if not exists
    let currentRow = this.cellMappings.skillsStart + 10;
    
    if (projects.length > 0) {
      this.setCellWithStyle(this.worksheet, `A${currentRow}`, 'PROJECTS', {
        font: { bold: true, size: 12, color: { rgb: '2563EB' } },
        fill: { fgColor: { rgb: 'EBF4FF' } }
      });
      currentRow += 2;
      
      projects.forEach((project) => {
        this.worksheet[`B${currentRow}`] = { v: project.name, t: 's', s: { font: { bold: true } } };
        this.worksheet[`E${currentRow}`] = { v: `${this.formatDate(project.startDate)} - ${this.formatDate(project.endDate)}`, t: 's' };
        currentRow++;
        
        if (project.description) {
          this.setCellWithStyle(this.worksheet, `B${currentRow}`, project.description, {
            alignment: { wrapText: true }
          });
          currentRow++;
        }
        
        if (project.technologies.length > 0) {
          this.worksheet[`B${currentRow}`] = { v: `Technologies: ${project.technologies.join(', ')}`, t: 's' };
          currentRow++;
        }
        
        currentRow++;
      });
    }
  }

  private populateCertifications(certifications: any[]) {
    // Similar implementation for certifications
    if (certifications.length > 0) {
      // Add certifications to appropriate cells
    }
  }

  private populateAwards(awards: any[]) {
    // Similar implementation for awards
    if (awards.length > 0) {
      // Add awards to appropriate cells
    }
  }

  private applyTheme(theme: ResumeTheme) {
    // Apply theme colors to headers and accents
    const headerStyle = {
      font: { color: { rgb: theme.primaryColor.replace('#', '') } },
      fill: { fgColor: { rgb: theme.primaryColor.replace('#', '') + '20' } }
    };
    
    // Apply to section headers
    ['A1', 'A10', 'A15', 'A29', 'A39'].forEach(cell => {
      if (this.worksheet[cell]) {
        this.worksheet[cell].s = { ...this.worksheet[cell].s, ...headerStyle };
      }
    });
  }

  private formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  }

  public export(filename: string = 'resume.xlsx') {
    // Set row heights for better formatting
    this.worksheet['!rows'] = Array(50).fill({ hpt: 20 });
    
    // Generate Excel file
    const excelBuffer = XLSX.write(this.workbook, { 
      bookType: 'xlsx', 
      type: 'array',
      cellStyles: true
    });
    
    // Save file
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, filename);
  }
}

// Export functions for different templates
export const exportToExcel = (data: ResumeData, theme: ResumeTheme, templateName: string = 'professional') => {
  const exporter = new ExcelExporter(templateName);
  exporter.populateData(data, theme);
  
  const filename = `${data.personalInfo.firstName}_${data.personalInfo.lastName}_Resume.xlsx`;
  exporter.export(filename);
};

export const exportToExcelWithTemplate = (data: ResumeData, theme: ResumeTheme, templateFile: File) => {
  // For custom template files
  const reader = new FileReader();
  reader.onload = (e) => {
    const arrayBuffer = e.target?.result as ArrayBuffer;
    const workbook = XLSX.read(arrayBuffer, { type: 'array', cellStyles: true });
    
    // Populate existing template with data
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    
    // Custom logic to populate template while preserving formatting
    populateExistingTemplate(worksheet, data, theme);
    
    // Export modified template
    const excelBuffer = XLSX.write(workbook, { 
      bookType: 'xlsx', 
      type: 'array',
      cellStyles: true
    });
    
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const filename = `${data.personalInfo.firstName}_${data.personalInfo.lastName}_Resume.xlsx`;
    saveAs(blob, filename);
  };
  
  reader.readAsArrayBuffer(templateFile);
};

const populateExistingTemplate = (worksheet: XLSX.WorkSheet, data: ResumeData, theme: ResumeTheme) => {
  // Smart detection of template structure and data population
  // This would analyze the existing template and populate data accordingly
  
  // Find cells that contain placeholder text or are empty but formatted
  const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1:Z100');
  
  for (let row = range.s.r; row <= range.e.r; row++) {
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
      const cell = worksheet[cellAddress];
      
      if (cell && cell.v) {
        const cellValue = cell.v.toString().toLowerCase();
        
        // Replace placeholder text with actual data
        if (cellValue.includes('name') || cellValue.includes('[name]')) {
          cell.v = `${data.personalInfo.firstName} ${data.personalInfo.lastName}`;
        } else if (cellValue.includes('email') || cellValue.includes('[email]')) {
          cell.v = data.personalInfo.email;
        } else if (cellValue.includes('phone') || cellValue.includes('[phone]')) {
          cell.v = data.personalInfo.phone;
        }
        // Add more placeholder replacements as needed
      }
    }
  }
};