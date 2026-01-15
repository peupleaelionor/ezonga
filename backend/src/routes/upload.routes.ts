import { Router } from 'express';
import { upload } from '../middleware/upload';
import { auth } from '../middleware/auth';

const router = Router();

router.post('/avatar', auth, upload.single('avatar'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

export default router;