# Visa Processing Platform

A comprehensive full-stack web application for managing visa applications with complete CRUD operations, user authentication, and real-time status tracking.

## 🌟 Live Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **GitHub Repository**: https://github.com/rajachava/visa-processing-platform
- **Production**: Testing Enhanced Deployment Debugging - CI/CD pipeline active

## 🚀 CI/CD Pipeline

This project includes a complete CI/CD pipeline using GitHub Actions for automated testing and deployment:

### Automated Workflow
1. **Testing**: Runs on every push and pull request
   - Backend tests (Mocha)
   - Frontend tests (Jest)
   - Code quality checks

2. **Build**: Creates production builds
   - Frontend build optimization
   - Backend dependency installation

3. **Deployment**: Automatic deployment to AWS
   - **Backend**: Deployed to EC2 instance with PM2
   - **Frontend**: Deployed to S3 with CloudFront CDN

# Frontend Configuration
REACT_APP_API_URL=https://your-backend-domain.com/api
``` 

## 📋 Features

### Core Functionality
- ✅ **User Authentication**: Secure registration and login with JWT tokens
- ✅ **Visa Application Management**: Complete CRUD operations for visa applications
- ✅ **Application Status Tracking**: Real-time status updates (Draft, Submitted, Under Review, Approved, Rejected)
- ✅ **Personal Information Management**: Store and manage applicant personal details
- ✅ **Travel Information**: Manage travel dates and visa types
- ✅ **Professional Dashboard**: Clean, responsive user interface

### Visa Types Supported
- Tourist Visa
- Business Visa
- Student Visa
- Work Visa
- Transit Visa

### Application Status Workflow
1. **Draft** - Initial application creation
2. **Submitted** - Application submitted for review
3. **Under Review** - Being processed by admin
4. **Documents Required** - Additional documents needed
5. **Approved** - Visa application approved
6. **Rejected** - Application rejected with feedback

## 🛠 Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React.js** - Frontend framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Tailwind CSS** - Utility-first CSS framework

### Database Schema
- **Users**: Authentication and profile management
- **Visa Applications**: Complete application data with personal info and travel details
- **Application Status**: Real-time status tracking system

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rajachava/visa-processing-platform.git
   cd visa-processing-platform
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

   Create `.env` file in backend folder:
   ```env
   MONGODB_URI=mongodb+srv://rajachava27:VeUtXk1Jd2l8x9sZ@cluster0.mkciity.mongodb.net/visa_processing_platform?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=visa_platform_super_secure_secret_key_12345
   PORT=5000
   NODE_ENV=development
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

   Create `.env` file in frontend folder:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the Application**
   
   **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm start
   ```

   **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm start
   ```

   **Or use the root script:**
   ```bash
   npm start  # Starts both backend and frontend concurrently
   ```

5. **Access the Application**
   - Open browser and navigate to `http://localhost:3000`
   - Register a new account or login with existing credentials

## 🚀 Deployment

### Local Development
The application is ready for local development with the setup above.

### Production Deployment
The project includes automated CI/CD pipeline for production deployment:

1. **Push to main branch** triggers automatic deployment
2. **Backend deploys to AWS EC2** with PM2 process management
3. **Frontend deploys to S3** with CloudFront CDN
4. **Database** uses MongoDB Atlas (production-ready)

### Manual Deployment Steps
If you prefer manual deployment:

1. **Backend (EC2)**:
   ```bash
   # SSH to your EC2 instance
   ssh -i your-key.pem ec2-user@your-ec2-ip
   
   # Clone and setup
   git clone https://github.com/rajachava/visa-processing-platform.git
   cd visa-processing-platform/backend
   npm install
   
   # Install PM2 globally
   npm install -g pm2
   
   # Start with PM2
   pm2 start server.js --name visa-backend
   pm2 startup
   pm2 save
   ```

2. **Frontend (S3 + CloudFront)**:
   ```bash
   # Build the frontend
   cd frontend
   npm run build
   
   # Deploy to S3
   aws s3 sync build/ s3://your-bucket-name --delete
   
   # Invalidate CloudFront cache
   aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
   ```
   **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm start
   ```

   **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm start
   ```

5. **Access the Application**
   - Open browser and navigate to `http://localhost:3000`
   - Register a new account or login with existing credentials

## 📁 Project Structure

```
visa-processing-platform/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection configuration
│   ├── controllers/
│   │   └── authController.js     # Authentication logic
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT authentication middleware
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── VisaApplication.js   # Visa application schema
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   └── applications.js      # Visa application routes
│   ├── uploads/                 # File upload directory
│   ├── .env                     # Environment variables
│   ├── server.js               # Express server configuration
│   └── package.json            # Backend dependencies
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── visa/
│   │   │   │   └── VisaDashboard.jsx  # Main visa dashboard
│   │   │   └── Navbar.jsx             # Navigation component
│   │   ├── pages/
│   │   │   ├── Login.jsx              # Login page
│   │   │   ├── Register.jsx           # Registration page
│   │   │   └── Profile.jsx            # User profile page
│   │   ├── axiosConfig.jsx            # API configuration
│   │   ├── App.js                     # Main app component
│   │   └── index.js                   # React entry point
│   ├── .env                           # Frontend environment variables
│   └── package.json                   # Frontend dependencies
├── README.md                          # Project documentation
└── .gitignore                         # Git ignore rules
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Visa Applications
- `GET /api/applications` - Get all user applications
- `GET /api/applications/:id` - Get specific application
- `POST /api/applications` - Create new application
- `PUT /api/applications/:id` - Update application
- `DELETE /api/applications/:id` - Delete application

## 💾 Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  university: String,
  address: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Visa Application Model
```javascript
{
  userId: ObjectId (ref: User),
  applicationId: String (unique),
  personalInfo: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    dateOfBirth: Date,
    nationality: String,
    passportNumber: String
  },
  visaType: String (enum: Tourist, Business, Student, Work, Transit),
  purpose: String,
  travelDates: {
    arrivalDate: Date,
    departureDate: Date
  },
  status: String (enum: Draft, Submitted, Under Review, etc.),
  submissionDate: Date,
  lastUpdated: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 Testing

### Manual Testing Checklist
- ✅ User registration and login
- ✅ Visa application creation
- ✅ Application data persistence
- ✅ Status tracking functionality
- ✅ Authentication token management
- ✅ Responsive design on different screen sizes

### Test User Credentials
For testing purposes, you can create a new account or use:
- **Email**: test@example.com
- **Password**: Test123!

## 🔐 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Both client and server-side validation
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Environment Variables**: Sensitive data stored in environment files

## 🚀 Deployment

### Backend Deployment
- Configure MongoDB Atlas connection
- Set up environment variables on hosting platform
- Deploy to AWS EC2 or similar service

### Frontend Deployment
- Build production version: `npm run build`
- Deploy to AWS S3 + CloudFront or similar service
- Update API URLs for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## 📝 Development Notes

### Project Requirements Met
- ✅ Full-stack application with Node.js, React, and MongoDB
- ✅ Complete CRUD operations for visa applications
- ✅ User authentication and authorization
- ✅ Professional UI/UX design
- ✅ RESTful API architecture
- ✅ Proper error handling and validation
- ✅ Responsive design
- ✅ Environment-based configuration

### Future Enhancements
- Document upload functionality
- Payment processing integration
- Email notifications
- Admin panel for application review
- Advanced search and filtering
- Application status history tracking
- Multi-language support

## 📞 Support

For questions or support, please contact:
- **Email**: rajachava27@gmail.com
- **GitHub**: [@rajachava](https://github.com/rajachava)

## 🙏 Acknowledgments

- Built as part of IFN636: Software Life Cycle Management course
- MongoDB Atlas for database hosting
- React.js community for excellent documentation
- Express.js for robust backend framework

---

**Built with ❤️ by Raja Chava**

