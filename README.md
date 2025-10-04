# Business Cards API

A comprehensive REST API for managing business cards and users, built with Node.js, Express, and MongoDB.

## 🚀 Features

### Users Management
- ✅ User registration
- ✅ User authentication
- ✅ Get user profile
- ✅ Update user profile
- ✅ Change business status
- ✅ Delete user (with all their cards)
- ✅ Admin user management

### Business Cards Management
- ✅ Create business card
- ✅ Get all cards (public)
- ✅ Get card by ID
- ✅ Get my cards
- ✅ Update card
- ✅ Delete card
- ✅ Like/unlike card
- ✅ Change business number (admin only)

### Security
- ✅ JWT authentication
- ✅ Role-based authorization (regular, business, admin)
- ✅ Protection against failed login attempts
- ✅ Password encryption with bcrypt

### Validation
- ✅ Complete field validation
- ✅ Clear error messages
- ✅ Israeli phone number validation
- ✅ Email format validation

## 🛠️ Technologies

### Core Technologies:
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Authentication & Security:
- **JWT (jsonwebtoken)** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing and encryption

### Validation & Middleware:
- **Joi** - Schema validation library
- **dotenv** - Environment variables management
- **Morgan** - HTTP request logger
- **CORS** - Cross-Origin Resource Sharing

### Development:
- **nodemon** - Development server with auto-restart

## 📋 System Requirements

- Node.js (version 14 or higher)
- MongoDB (version 4.4 or higher)
- npm or yarn

## 🚀 Installation and Setup

### 1. Clone the repository
```bash
git clone https://github.com/VireNN1993/NodeJs_Project_Natan_Blochin.git
cd NodeJs_Project_Natan_Blochin
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment configuration
Create a `config.env` file with the following settings:

```env
# Environment Configuration
NODE_ENV=development
PORT=3000

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/node-project

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# File Logger Configuration
LOG_FILE_PATH=./logs/error.log
```

### 4. Start MongoDB
Make sure MongoDB is running on port 27017

### 5. Start the server
```bash
npm start
# or
node app.js
```

The server will run on `http://localhost:3000`

## 📚 API Endpoints

### Users

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/users/register` | Register new user | Public |
| POST | `/users/login` | User login | Public |
| GET | `/users/me` | Get current user profile | Private |
| PUT | `/users/me` | Update current user | Private |
| PATCH | `/users/me/business` | Change business status | Private |
| GET | `/users` | Get all users | Admin |
| GET | `/users/:id` | Get user by ID | Self/Admin |
| PUT | `/users/:id` | Update user | Self/Admin |
| DELETE | `/users/:id` | Delete user | Self/Admin |

### Business Cards

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/cards` | Get all cards | Public |
| GET | `/cards/:id` | Get card by ID | Public |
| GET | `/cards/my-cards` | Get my cards | Private |
| POST | `/cards` | Create new card | Business |
| PUT | `/cards/:id` | Update card | Owner/Admin |
| PATCH | `/cards/:id` | Like/unlike card | Private |
| DELETE | `/cards/:id` | Delete card | Owner/Admin |
| PATCH | `/cards/:id/biz-number` | Change business number | Admin |

### Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Server health check |

## 🔐 Authentication and Authorization

### User Types
- **Regular User**: Can manage their own profile
- **Business User**: Can create and manage business cards
- **Admin**: Full access to all features

### JWT Usage
```javascript
// Add token to header
Authorization: Bearer <your-jwt-token>
```

## 📝 Usage Examples

### Register new user
```javascript
POST /users/register
{
  "name": {
    "first": "John",
    "last": "Doe",
    "middle": ""
  },
  "phone": "0501234567",
  "email": "john@example.com",
  "password": "1234567",
  "address": {
    "country": "Israel",
    "city": "Tel Aviv",
    "street": "Dizengoff",
    "houseNumber": 1,
    "zip": 12345
  }
}
```

### Create business card
```javascript
POST /cards
Authorization: Bearer <token>
{
  "title": "Great Restaurant",
  "subtitle": "Delicious Food",
  "description": "The best restaurant in the city",
  "phone": "0509876543",
  "email": "restaurant@example.com",
  "web": "https://restaurant.com",
  "address": {
    "country": "Israel",
    "city": "Tel Aviv",
    "street": "Allenby",
    "houseNumber": 10,
    "zip": 54321
  }
}
```

## 🧪 Testing

The project includes comprehensive testing for all endpoints:

### Tests performed:
- ✅ User registration and authentication
- ✅ Authentication and authorization
- ✅ Card creation and updates
- ✅ Validation and error handling
- ✅ User management and status changes

## 📁 Project Structure

```
├── controllers/          # Business logic
│   ├── cardsController.js
│   └── usersController.js
├── middleware/           # Middleware functions
│   ├── auth.js          # Authentication and authorization
│   ├── errorHandler.js  # Error handling
│   ├── fileLogger.js    # File logging
│   └── validation.js    # Validation
├── models/              # MongoDB models
│   ├── Card.js
│   └── User.js
├── routes/              # API routes
│   ├── cards.js
│   └── users.js
├── utils/               # Utility functions
│   └── initialData.js   # Initial data
├── logs/                # Log files
├── app.js               # Main server file
├── config.env           # Environment variables
└── package.json         # Project dependencies
```

## 🔧 Development

### Run in development mode
```bash
npm run dev
```

### Initial data
The server automatically creates initial data on first startup:

**Initial users:**
- `john@example.com` (Regular user) - Password: `1234567`
- `jane@example.com` (Business user) - Password: `1234567`
- `admin@example.com` (Admin user) - Password: `1234567`

**Initial cards:**
- Pizza Palace (by Jane)
- Coffee Corner (by Jane)
- Tech Solutions (by Admin)

## 📞 Support

For questions and support, create an issue in the GitHub repository.

## 📄 License

This project is distributed under the MIT License.