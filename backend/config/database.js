const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Starting MongoDB connection attempt...');
    
    // Connection options
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      maxPoolSize: 10,
      minPoolSize: 2,
      maxIdleTimeMS: 10000,
      keepAlive: true,
      keepAliveInitialDelay: 300000
    };

    // Connect with retry logic
    let retries = 3;
    while (retries > 0) {
      try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, options);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
        // Set up connection error handlers
        mongoose.connection.on('error', err => {
          console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
          console.log('MongoDB disconnected');
        });

        mongoose.connection.on('reconnected', () => {
          console.log('MongoDB reconnected');
        });

        return conn;
      } catch (error) {
        retries -= 1;
        if (retries === 0) throw error;
        console.log(`Connection failed, retrying... (${retries} attempts left)`);
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
  } catch (error) {
    console.error('MongoDB connection error details:', {
      name: error.name,
      message: error.message,
      code: error.code
    });
    throw error;
  }
};

module.exports = { connectDB, mongoose };