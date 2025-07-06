const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

async function testContactSubmission() {
    try {
        // Connect to MongoDB
        console.log('Connecting to:', process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/space-blog');
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/space-blog');
        
        // Get the Contact model
        const Contact = require('./models/Contact');
        
        // Create a test message
        const testMessage = new Contact({
            name: 'Database Test',
            email: 'test@verify.com',
            subject: 'Verifying Database Storage',
            message: 'This is a test to verify messages are being stored in space-blog database',
            status: 'unread'
        });
        
        // Save the message
        const savedMessage = await testMessage.save();
        console.log('\nTest message saved successfully:', savedMessage._id);
        
        // Verify we can retrieve the message
        const contacts = await Contact.find().sort({ createdAt: -1 }).limit(3);
        
        console.log('\nLatest 3 messages in database:');
        console.log('===========================\n');
        
        contacts.forEach((contact, index) => {
            console.log(`Message ${index + 1}:`);
            console.log(`ID: ${contact._id}`);
            console.log(`Date: ${contact.createdAt.toLocaleString()}`);
            console.log(`From: ${contact.name} (${contact.email})`);
            console.log(`Subject: ${contact.subject}`);
            console.log(`Status: ${contact.status}`);
            console.log('-------------------\n');
        });
        
        // Clean up test message
        await Contact.deleteOne({ _id: savedMessage._id });
        console.log('Test message cleaned up');
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.connection.close();
    }
}

testContactSubmission();
