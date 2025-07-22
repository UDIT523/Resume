import express from 'express';
import multer from 'multer';
import pdf from 'pdf-parse';
import path from 'path';
import fs from 'fs';
import { ResumeData } from '../../src/types/resume'; // Assuming types are available in a shared location

const router = express.Router();

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer storage configuration for profile pictures
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Placeholder function to parse resume text into ResumeData format
const parseResumeText = (text: string): ResumeData => {
  // This is a simplified parsing logic. A real-world solution would involve
  // advanced NLP techniques, regex, and potentially AI models to accurately
  // extract and structure resume data.

  const lines = text.split('\n').map(line => line.trim()).filter(Boolean);

  let personalInfo = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
  };
  let summary = '';
  let workExperience: any[] = [];
  let education: any[] = [];
  let skills: any[] = [];
  let certifications: any[] = [];
  let projects: any[] = [];
  let languages: any[] = [];
  let awards: any[] = [];

  // Simple regex for common fields
  const emailMatch = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
  if (emailMatch) personalInfo.email = emailMatch[0];

  const phoneMatch = text.match(/(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/);
  if (phoneMatch) personalInfo.phone = phoneMatch[0];

  // Very basic attempt to get name and summary
  if (lines.length > 0) {
    personalInfo.firstName = lines[0].split(' ')[0] || '';
    personalInfo.lastName = lines[0].split(' ').slice(1).join(' ') || '';
  }
  if (lines.length > 1) {
    summary = lines[1]; // Assuming the second line is a summary
  }

  // For demonstration, let's add some dummy data if parsing fails to get anything
  if (!personalInfo.firstName && !personalInfo.lastName) {
    personalInfo = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      location: 'Anytown, USA',
      website: 'https://johndoe.com',
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
    };
    summary = 'Highly motivated and results-oriented professional with a proven track record of success in various roles.';
    workExperience = [{
      id: '1', company: 'ABC Corp', position: 'Software Engineer', location: 'Remote', startDate: '2020-01', endDate: '2023-12', current: false, description: 'Developed and maintained web applications.', achievements: ['Increased efficiency by 20%']
    }];
    education = [{
      id: '1', institution: 'University of XYZ', degree: 'B.S.', field: 'Computer Science', location: 'City, State', startDate: '2016-09', endDate: '2020-05'
    }];
    skills = [{ id: '1', name: 'JavaScript', level: 'Expert', category: 'Technical' }];
    certifications = [];
    projects = [];
    languages = [];
    awards = [];
  }


  return {
    personalInfo,
    summary,
    workExperience,
    education,
    skills,
    certifications,
    projects,
    languages,
    awards,
  };
};

router.post('/resume', upload.single('resume'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const fileType = req.file.mimetype;
  let resumeData: ResumeData;

  try {
    if (fileType === 'application/pdf') {
      const data = await pdf(req.file.buffer);
      resumeData = parseResumeText(data.text);
    } else if (fileType === 'text/html') {
      // For HTML, we can directly read the buffer as text
      const htmlText = req.file.buffer.toString('utf-8');
      resumeData = parseResumeText(htmlText);
    } else {
      // Handle other unsupported file types
      return res.status(400).send('Unsupported file type. Please upload PDF or HTML.');
    }
    res.json(resumeData); // Send JSON data
  } catch (error) {
    console.error('Error processing resume:', error);
    res.status(500).send('Error processing resume.');
  }
});

router.post('/profile-picture', upload.single('profilePicture'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const filePath = `/uploads/${req.file.filename}`;
  res.json({ filePath });
});

export default router;
