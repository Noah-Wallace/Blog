const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

dotenv.config();

async function testConnection() {
  try {
    console.log('Starting MongoDB connection test...');
    console.log('MongoDB URI:', process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/space-blog');

    const connection = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/space-blog', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });

    console.log('Successfully connected to MongoDB!');
    console.log('Connection state:', mongoose.connection.readyState);
    
    // Create a test contact
    const Contact = mongoose.model('Contact', new mongoose.Schema({
      name: String,
      email: String,
      subject: String,
      message: String,
      status: { type: String, default: 'unread' }
    }));
    
    console.log('Creating test contact...');
    const testContact = new Contact({
      name: 'Test User',
      email: 'test@example.com',
      subject: 'MongoDB Test',
      message: 'Testing MongoDB connection at ' + new Date().toISOString()
    });
    
    console.log('Saving test contact...');
    const savedContact = await testContact.save();
    console.log('Test contact saved successfully:', savedContact._id);
    
    console.log('Retrieving test contact...');
    const foundContact = await Contact.findById(savedContact._id);
    console.log('Retrieved contact:', foundContact);
    
    console.log('Cleaning up test data...');
    await Contact.deleteOne({ _id: savedContact._id });
    console.log('Test data cleaned up');
    
    await mongoose.connection.close();
    console.log('Connection closed successfully');
    
  } catch (error) {
    console.error('Error occurred during test:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log('Connection closed in finally block');
    }
    setTimeout(() => process.exit(0), 1000);
  }
}

console.log('Starting test script...');
testConnection();
