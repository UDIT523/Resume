import { Plugin } from 'vite';
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

export default function upload(): Plugin {
  const app = express();
  const uploadsDir = path.join(__dirname, 'public', 'uploads');

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

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

  app.post('/api/upload/profile-picture', upload.single('profilePicture'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    const filePath = `/uploads/${req.file.filename}`;
    res.json({ filePath });
  });

  return {
    name: 'vite-plugin-upload',
    configureServer(server) {
      server.middlewares.use(app);
    },
  };
}
