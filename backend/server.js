const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const gradeRoutes = require('./routes/gradeRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const quizRoutes = require('./routes/quizRoutes');
const studentRoutes = require('./routes/studentRoutes');
const cors = require('cors');

const app = express();

dotenv.config();

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.trim() === '') {
  console.warn('WARNING: JWT_SECRET is not set. Using a default development secret. Set JWT_SECRET in backend/.env before deploying.');
  process.env.JWT_SECRET = 'education_project_development_secret';
}

const defaultAllowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://education-managment-one.vercel.app',
];

const allowedOrigins = new Set(defaultAllowedOrigins);
if (process.env.CLIENT_ORIGIN) {
  process.env.CLIENT_ORIGIN.split(',').forEach((o) => {
    const trimmed = o.trim();
    if (trimmed) allowedOrigins.add(trimmed);
  });
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use('/api/auth', authRoutes);
app.use('/api/enrollcourses', enrollmentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/teacher', teacherRoutes)
  app.use('/api/grades', gradeRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/student', studentRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/api/health', (req, res) => {
  const ready = require('mongoose').connection.readyState === 1;
  res.status(ready ? 200 : 503).json({
    ok: ready,
    db: ready ? 'connected' : 'disconnected',
  });
});

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (e) {
    console.error('Failed to start server:', e.message);
    process.exit(1);
  }
})();
