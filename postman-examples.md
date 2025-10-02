# Postman API Examples

## 🔐 Authentication Flow

### 1. Register New User
```http
POST http://localhost:3000/users/register
Content-Type: application/json

{
  "name": {
    "first": "John",
    "middle": "",
    "last": "Doe"
  },
  "phone": "0501234567",
  "email": "john@example.com",
  "password": "1234567",
  "address": {
    "country": "Israel",
    "city": "Tel Aviv",
    "street": "Dizengoff",
    "houseNumber": 100
  },
  "isBusiness": false
}
```

### 2. Login User
```http
POST http://localhost:3000/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "1234567"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": {
        "first": "John",
        "middle": "",
        "last": "Doe"
      },
      "email": "john@example.com",
      "phone": "0501234567",
      "isBusiness": false,
      "isAdmin": false
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

## 👥 User Endpoints

### 3. Get All Users (Admin Only)
```http
GET http://localhost:3000/users
Authorization: Bearer <admin-token>
```

### 4. Get My Profile
```http
GET http://localhost:3000/users/me
Authorization: Bearer <token>
```

### 5. Update My Profile
```http
PUT http://localhost:3000/users/me
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": {
    "first": "John",
    "middle": "Michael",
    "last": "Doe"
  },
  "phone": "0507654321"
}
```

### 6. Change Business Status
```http
PATCH http://localhost:3000/users/me/business
Authorization: Bearer <token>
Content-Type: application/json

{
  "isBusiness": true
}
```

### 7. Delete User
```http
DELETE http://localhost:3000/users/64f8a1b2c3d4e5f6a7b8c9d0
Authorization: Bearer <token>
```

## 🎴 Card Endpoints

### 8. Get All Cards (Public)
```http
GET http://localhost:3000/cards
```

### 9. Get My Cards
```http
GET http://localhost:3000/cards/my-cards
Authorization: Bearer <token>
```

### 10. Get Card by ID
```http
GET http://localhost:3000/cards/64f8a1b2c3d4e5f6a7b8c9d1
```

### 11. Create New Card (Business Users Only)
```http
POST http://localhost:3000/cards
Authorization: Bearer <business-user-token>
Content-Type: application/json

{
  "title": "My Restaurant",
  "subtitle": "Best Food in Town",
  "description": "We serve authentic Italian cuisine with fresh ingredients and traditional recipes.",
  "phone": "0501234567",
  "email": "info@myrestaurant.com",
  "web": "https://myrestaurant.com",
  "image": {
    "url": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
    "alt": "Restaurant interior"
  },
  "address": {
    "country": "Israel",
    "city": "Tel Aviv",
    "street": "Rothschild",
    "houseNumber": 25
  }
}
```

### 12. Update Card
```http
PUT http://localhost:3000/cards/64f8a1b2c3d4e5f6a7b8c9d1
Authorization: Bearer <owner-token>
Content-Type: application/json

{
  "title": "Updated Restaurant Name",
  "description": "Updated description with new information"
}
```

### 13. Like/Unlike Card
```http
PATCH http://localhost:3000/cards/64f8a1b2c3d4e5f6a7b8c9d1
Authorization: Bearer <token>
```

### 14. Delete Card
```http
DELETE http://localhost:3000/cards/64f8a1b2c3d4e5f6a7b8c9d1
Authorization: Bearer <owner-token>
```

### 15. Change Business Number (Admin Only)
```http
PATCH http://localhost:3000/cards/64f8a1b2c3d4e5f6a7b8c9d1/biz-number
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "bizNumber": 123456789
}
```

## 🏥 Health Check

### 16. Health Check
```http
GET http://localhost:3000/health
```

## 📝 Initial Test Users

Use these credentials for testing:

### Regular User
- **Email:** john@example.com
- **Password:** 1234567
- **Type:** Regular user

### Business User
- **Email:** jane@example.com
- **Password:** 1234567
- **Type:** Business user

### Admin User
- **Email:** admin@example.com
- **Password:** 1234567
- **Type:** Admin user

## 🔧 Postman Collection Setup

1. **Create Environment Variables:**
   - `base_url`: `http://localhost:3000`
   - `token`: (will be set after login)

2. **Pre-request Script for Token:**
   ```javascript
   if (pm.response.json().data && pm.response.json().data.token) {
       pm.environment.set("token", pm.response.json().data.token);
   }
   ```

3. **Authorization Setup:**
   - Type: Bearer Token
   - Token: `{{token}}`

## 🚨 Error Examples

### Validation Error
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    "Email is required",
    "Password must be at least 7 characters"
  ]
}
```

### Authentication Error
```json
{
  "success": false,
  "message": "Access token is required"
}
```

### Authorization Error
```json
{
  "success": false,
  "message": "Business account required"
}
```

### Account Locked
```json
{
  "success": false,
  "message": "Account is temporarily locked due to too many failed login attempts"
}
```




