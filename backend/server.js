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

// Custom middleware for handling static files
const staticFileMiddleware = (req, res, next) => {
  const ext = path.extname(req.path).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
  };

  if (mimeTypes[ext]) {
    res.type(mimeTypes[ext]);
  }
  next();
};

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
  origin: function(origin, callback) {
    const allowedOrigins = [
      process.env.CLIENT_URL,
      'https://blog-1-osgy.onrender.com',
      'https://chroniclesofthecosmos.onrender.com',
      'https://backend-chroniclesofcosmos.onrender.com',
      'http://localhost:3000',
      'http://localhost:5000'
    ].filter(Boolean);
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      callback(null, true);
      return;
    }

    // Allow all origins in development
    if (process.env.NODE_ENV === 'development') {
      callback(null, true);
      return;
    }

    try {
      const originUrl = new URL(origin);
      // Check if the origin is in our allowed list
      if (allowedOrigins.some(allowed => originUrl.href.includes(allowed))) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    } catch (error) {
      callback(new Error('Invalid origin'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length', 'Content-Type'],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Apply CORS
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Import models
const Contact = require('./models/Contact');
const Engagement = require('./models/Engagement');

// Base API routes
const apiRouter = express.Router();
app.use('/', apiRouter);

// Auth routes
apiRouter.use('/auth', authRoutes);

// Admin routes (protected by auth middleware)
apiRouter.use('/admin', authMiddleware, adminRoutes);

// Posts endpoints
apiRouter.get('/posts', (req, res) => {
  try {
    let posts;
    try {
      posts = require('./data/posts-data.js');
    } catch (err) {
      console.error('Error loading posts module:', err);
      posts = [];
    }
    
    if (!Array.isArray(posts)) {
      console.error('Posts data is not an array:', posts);
      posts = [];
    }
    
    res.json(posts);
  } catch (error) {
    console.error('Error in /posts endpoint:', error);
    res.status(500).json({ 
      error: 'Failed to fetch posts',
      details: error.message 
    });
  }
});

// Get single post by ID
apiRouter.get('/posts/:id', async (req, res) => {
  try {
    const posts = require('./data/posts.js');
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// Rate limiting middleware
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Apply rate limiting to all API routes
apiRouter.use(apiLimiter);

// Contact form endpoint with rate limiting
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5 // limit each IP to 5 requests per hour
});

apiRouter.post('/contact', contactLimiter, async (req, res) => {
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
apiRouter.post('/engagement', async (req, res) => {
  try {
    const engagement = new Engagement(req.body);
    await engagement.save();
    res.status(201).json({ message: 'Engagement recorded successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to record engagement' });
  }
});

apiRouter.get('/engagement/:postId', async (req, res) => {
  try {
    const engagements = await Engagement.find({ postId: req.params.postId });
    res.json(engagements);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch engagements' });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files
  app.use(express.static(path.join(__dirname, "../frontend/build"), {
    maxAge: '1d',
    etag: true,
    setHeaders: (res, path) => {
      // Set proper content type for manifest.json
      if (path.endsWith('.json')) {
        res.set('Content-Type', 'application/json');
      }
      // Set proper content type for images
      if (path.endsWith('.png')) {
        res.set('Content-Type', 'image/png');
      }
      // Set CORS headers for static files
      res.set('Access-Control-Allow-Origin', '*');
    }
  }));

  // Serve other static assets
  app.get('/static/*', (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", req.path));
  });

  // Handle all other routes by serving index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', {
    message: err.message,
    stack: err.stack,
    path: req.path
  });
  
  res.status(err.status || 500).json({ 
    error: err.message || 'Internal server error',
    path: req.path
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
    process.on('SIGTERM', async () => {
      try {
        console.log('SIGTERM signal received: closing HTTP server');
        await new Promise(resolve => server.close(resolve));
        console.log('HTTP server closed');
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
        process.exit(0);
      } catch (error) {
        console.error('Error during shutdown:', error);
        process.exit(1);
      }
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();