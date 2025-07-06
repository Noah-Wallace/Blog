const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { connectDB } = require('./config/database');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/auth');

// Load environment variables
dotenv.config();
console.log('Environment loaded');

const app = express();

// Middleware
const corsOptions = {
  origin: ['http://localhost:3000', process.env.CLIENT_URL].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
};
console.log('Setting up CORS with options:', corsOptions);

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import models
const Contact = require('./models/Contact');
const Engagement = require('./models/Engagement');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', authMiddleware, adminRoutes);

// Contact route handler with improved logging
app.post('/api/contact', async (req, res) => {
  console.log('Received contact form submission request');
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  
  try {
    // Validate required fields
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      console.log('Missing required fields:', { name, email, subject, message });
      return res.status(400).json({ 
        error: 'Please provide all required fields: name, email, subject, message' 
      });
    }

    const contact = new Contact({
      name,
      email,
      subject,
      message,
      status: 'unread', // Explicitly set status
      createdAt: new Date() // Explicitly set creation date
    });

    const savedContact = await contact.save();
    console.log('Contact saved successfully:', savedContact._id);
    
    res.status(201).json({
      message: 'Message sent successfully!',
      contactId: savedContact._id
    });
  } catch (error) {
    console.error('Contact submission error:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Validation error',
        details: Object.values(error.errors).map(err => err.message)
      });
    }
    
    res.status(500).json({
      error: 'Failed to send message',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Engagement routes
app.post('/api/engagement', async (req, res) => {
  try {
    const engagement = new Engagement(req.body);
    await engagement.save();
    res.status(201).json({ message: 'Engagement recorded successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to record engagement' });
  }
});

app.get('/api/engagement/:postId', async (req, res) => {
  try {
    const engagements = await Engagement.find({ postId: req.params.postId });
    res.json(engagements);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch engagements' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ 
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error' 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Async server startup
async function startServer() {
  try {
    console.log('Starting server...');
    // Connect to MongoDB first
    await connectDB();
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Server URL: http://localhost:${PORT}`);
      console.log('Ready to accept requests');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
