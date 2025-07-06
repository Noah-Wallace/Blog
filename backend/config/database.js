const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Starting MongoDB connection attempt...');
    console.log('MongoDB URI:', process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/space-blog');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/space-blog', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('MongoDB connection error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    
    // Don't exit process, let the application handle the error
    throw error;
  }
};

// Export both the connection function and the mongoose instance
module.exports = { connectDB, mongoose };
