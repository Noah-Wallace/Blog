# Space Tech Blog

A modern blog application built with the MERN stack (MongoDB, Express.js, React, Node.js) focusing on space technology and innovation.

## Features

- Responsive design for all devices
- Dynamic blog post system
- Contact form with admin management
- Secure admin authentication
- Post engagement tracking
- Modern and clean UI

## Technologies

### Backend
- Node.js with Express
- MongoDB for database
- JWT for authentication
- CORS enabled
- Environment variables support

### Frontend
- React with React Router
- CSS3 with modern features
- Responsive design
- Optimized build process

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Git

## Local Development Setup

1. Clone the repository:
```bash
git clone https://github.com/Noah-Wallace/Blog.git
cd Blog
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:

Create a `.env` file in the backend directory:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD_HASH=your_hashed_password
CLIENT_URL=http://localhost:3000
```

4. Start the development servers:

```bash
# Start backend server (from backend directory)
npm run dev

# Start frontend development server (from frontend directory)
npm start
```

## Deployment to Render

### Backend Deployment

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure the service:
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && node server.js`
   - Environment Variables:
     ```
     MONGODB_URI=your_production_mongodb_uri
     JWT_SECRET=your_production_jwt_secret
     ADMIN_USERNAME=your_admin_username
     ADMIN_PASSWORD_HASH=your_hashed_password
     CLIENT_URL=your_frontend_url
     NODE_ENV=production
     ```

### Frontend Deployment

1. Create a new Static Site on Render
2. Connect your GitHub repository
3. Configure the build:
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/build`
   - Environment Variables:
     ```
     REACT_APP_API_URL=your_backend_url
     ```

### Important Notes for Deployment

1. Update CORS settings in backend/server.js with your production URLs
2. Ensure MongoDB Atlas (or your preferred MongoDB host) is properly configured
3. Set up proper environment variables in Render's dashboard
4. Configure your domain and SSL settings in Render

## Project Structure

```
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Contact.js
│   │   └── Engagement.js
│   ├── routes/
│   │   ├── admin.js
│   │   └── auth.js
│   └── server.js
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── posts/
    │   └── App.js
    └── package.json
```

## Potential Improvements

1. Add loading states and better error handling
2. Implement image optimization for blog posts
3. Add pagination for blog posts
4. Implement search functionality
5. Add categories and tags for posts
6. Implement comment system
7. Add social sharing buttons

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
