const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { connectDB } = require('./config/database');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/auth');
const path = require("path");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['JWT_SECRET', 'MONGODB_URI', 'ADMIN_USERNAME', 'ADMIN_PASSWORD_HASH'];
requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    console.error(`Error: Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
});

const app = express();

// Security middleware
app.use(helmet()); // Add security headers
app.use(compression()); // Compress responses

// CORS configuration
const corsOptions = {
  origin: [
    process.env.CLIENT_URL,
    'https://blog-1-osgy.onrender.com',
    'http://localhost:3000'
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10kb' })); // Limit payload size
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Import models
const Contact = require('./models/Contact');
const Engagement = require('./models/Engagement');

// Posts endpoints
app.get('/api/posts', async (req, res) => {
  try {
    // Get posts from your posts directory
    const posts = require('./posts') || [];
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// API Routes
app.use('/api/auth', rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}), authRoutes);

app.use('/api/admin', authMiddleware, adminRoutes);

// Contact form endpoint with rate limiting
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5 // limit each IP to 5 requests per hour
});

app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Input validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: {
          name: !name ? 'Name is required' : null,
          email: !email ? 'Email is required' : null,
          subject: !subject ? 'Subject is required' : null,
          message: !message ? 'Message is required' : null
        }
      });
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const contact = new Contact({
      name,
      email,
      subject,
      message,
      status: 'unread',
      createdAt: new Date()
    });

    const savedContact = await contact.save();
    res.status(201).json({
      message: 'Message sent successfully!',
      contactId: savedContact._id
    });

  } catch (error) {
    console.error('Contact submission error:', {
      name: error.name,
      message: error.message
    });
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Validation error',
        details: Object.values(error.errors).map(err => err.message)
      });
    }
    
    res.status(500).json({
      error: 'Failed to send message'
    });
  }
});

// Engagement endpoints
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

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ 
    error: 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Async server startup with graceful shutdown
async function startServer() {
  let server;
  try {
    console.log('Starting server...');
    await connectDB();
    
    const PORT = process.env.PORT || 5000;
    server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
      console.log('Ready to accept requests');
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM signal received: closing HTTP server');
      server.close(() => {
        console.log('HTTP server closed');
        mongoose.connection.close(false, () => {
          console.log('MongoDB connection closed');
          process.exit(0);
        });
      });
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();