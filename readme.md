# PAWSforU Dog Adoption Management System

## Project Overview
A comprehensive dog adoption platform with user and admin functionalities.

## Technology Stack
- Frontend: React.js
- Backend: Express.js
- Database: MongoDB
- Authentication: Bcrypt
- Styling: Bootstrap

## Project Setup

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB

### Installation Steps
1. Clone the repository
2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd frontend
npm install
```

4. Create .env files for configuration
5. Start the development servers
```bash
# Backend server
cd backend
npm run dev

# Frontend server
cd frontend
npm start
```

## Key Features
- User registration and authentication
- Dog adoption application
- Admin management dashboard
- Profile management
- Adoption tracking

## Environment Variables
Create `.env` files in both backend and frontend directories with:

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/pawsforu
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

# PAWSforU Dog Adoption Management System

## Project Setup and Installation

### Prerequisites
- Node.js (v16+)
- MongoDB
- npm or yarn

### Backend Setup
1. Clone the repository
2. Navigate to backend directory
3. Install dependencies
```bash
cd backend
npm install
```

4. Create `.env` file with following variables:
```
MONGODB_URI=mongodb://localhost:27017/pawsforu
JWT_SECRET=your_secret_key
PORT=5000
NODE_ENV=development
```

5. Start backend server
```bash
npm run dev
```

### Frontend Setup
1. Navigate to frontend directory
2. Install dependencies
```bash
cd frontend
npm install
```

3. Create `.env` file
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start frontend development server
```bash
npm start
```

## Testing the Application

### Backend Testing
1. Run backend tests
```bash
cd backend
npm test
```

### Manual Testing Workflow
1. Register an admin user
2. Login as admin
3. Add dogs to the system
4. Create user accounts
5. Apply for dog adoption
6. Approve/Reject adoptions

### Postman/API Testing
- Import Postman collection from `postman_collection.json`
- Test various API endpoints
- Verify authentication and authorization

## Deployment Checklist
- Set production MongoDB URI
- Configure environment variables
- Enable HTTPS
- Set up proper logging
- Implement rate limiting
- Configure CORS

## Troubleshooting
- Ensure MongoDB is running
- Check console for error messages
- Verify `.env` configurations
- Restart servers if needed

## Contributing
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create pull request
```

To comprehensively test if everything is working:

1. Start MongoDB
2. Start Backend Server
   ```bash
   cd backend
   npm run dev
   ```
3. Start Frontend
   ```bash
   cd frontend
   npm start
   ```

Test Scenarios:
- Register Admin
- Register User
- Login as Admin
- Add Dogs
- Apply for Adoption
- Approve/Reject Adoption
- Check User/Admin Dashboards

Recommended API Testing Tools:
- Postman
- Insomnia
- Thunder Client (VSCode Extension)
