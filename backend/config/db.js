const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = (process.env.MONGO_URI || '').trim();
  if (!uri) {
    console.error(
      'MONGO_URI is missing or empty. Copy backend/.env.example to .env and paste your MongoDB Atlas connection string (no space after =).'
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log(`MongoDB connected: ${mongoose.connection.name}`);
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    console.error(
      'Check: (1) no space after MONGO_URI= in .env, (2) Atlas IP access (0.0.0.0/0 for dev), (3) username/password and cluster host.'
    );
    process.exit(1);
  }
};

module.exports = connectDB;
