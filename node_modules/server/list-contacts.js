const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

async function listContacts() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/space-blog');
        console.log('Connected to MongoDB');

        // Get the Contact model
        const Contact = require('./models/Contact');

        // Fetch all contacts, sorted by creation date (newest first)
        const contacts = await Contact.find().sort({ createdAt: -1 });

        console.log('\nAll Contact Messages:');
        console.log('====================\n');

        contacts.forEach((contact, index) => {
            console.log(`Message ${index + 1}:`);
            console.log(`Date: ${contact.createdAt.toLocaleString()}`);
            console.log(`From: ${contact.name} (${contact.email})`);
            console.log(`Subject: ${contact.subject}`);
            console.log(`Status: ${contact.status}`);
            console.log(`Message: ${contact.message}`);
            console.log('-------------------\n');
        });

        console.log(`Total messages: ${contacts.length}`);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.connection.close();
    }
}

listContacts();
