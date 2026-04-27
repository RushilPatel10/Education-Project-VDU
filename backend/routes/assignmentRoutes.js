const fs = require('fs');
const path = require('path');
const express = require('express');
const { protect, authorize } = require('../middlewares/authMiddleware');
const { uploadAssignment } = require('../controllers/assignmentsController');
const multer = require('multer');

const router = express.Router();

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage: storage });
router.post('/upload/:courseId', protect, authorize('Student'), upload.single('assignmentFile'), uploadAssignment);

module.exports = router;
