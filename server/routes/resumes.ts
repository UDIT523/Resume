import express from 'express';
import auth from '../middleware/auth';
import Resume from '../models/Resume';
import { AuthRequest } from '../middleware/auth';

const router = express.Router();

// Get all resumes for a user
router.get('/', auth, async (req: AuthRequest, res) => {
  if (!req.user) {
    return res.status(401).json({ msg: 'Not authorized' });
  }
  try {
    const resumes = await Resume.find({ user: req.user.id });
    res.json(resumes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Create a new resume
router.post('/', auth, async (req: AuthRequest, res) => {
  const { name, data } = req.body;

  if (!req.user) {
    return res.status(401).json({ msg: 'Not authorized' });
  }

  try {
    const newResume = new Resume({
      user: req.user.id,
      name,
      data,
    });

    const resume = await newResume.save();
    res.json(resume);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update a resume
router.put('/:id', auth, async (req: AuthRequest, res) => {
  const { name, data } = req.body;

  if (!req.user) {
    return res.status(401).json({ msg: 'Not authorized' });
  }

  try {
    let resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ msg: 'Resume not found' });
    }

    if (resume.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    resume = await Resume.findByIdAndUpdate(
      req.params.id,
      { $set: { name, data, updatedAt: Date.now() } },
      { new: true }
    );

    res.json(resume);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete a resume
router.delete('/:id', auth, async (req: AuthRequest, res) => {
  if (!req.user) {
    return res.status(401).json({ msg: 'Not authorized' });
  }
  try {
    let resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ msg: 'Resume not found' });
    }

    if (resume.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Resume.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Resume removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
