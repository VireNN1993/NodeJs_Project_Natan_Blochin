# Business Cards API

API מלא לניהול כרטיסי עסק ומשתמשים, בנוי עם Node.js, Express ו-MongoDB.

## 🚀 תכונות

### משתמשים (Users)
- ✅ רישום משתמש חדש
- ✅ התחברות משתמש
- ✅ קבלת פרטי משתמש
- ✅ עדכון פרטי משתמש
- ✅ שינוי סטטוס עסקי
- ✅ מחיקת משתמש (עם מחיקת כל הכרטיסים שלו)
- ✅ ניהול משתמשים (אדמין בלבד)

### כרטיסי עסק (Cards)
- ✅ יצירת כרטיס עסקי
- ✅ קבלת כל הכרטיסים (public)
- ✅ קבלת כרטיס לפי ID
- ✅ קבלת הכרטיסים שלי
- ✅ עדכון כרטיס
- ✅ מחיקת כרטיס
- ✅ לייק לכרטיס
- ✅ שינוי מספר עסקי (אדמין בלבד)

### אבטחה
- ✅ אימות JWT
- ✅ הרשאות לפי תפקיד (משתמש רגיל, עסקי, אדמין)
- ✅ הגנה על ניסיונות התחברות כושלים
- ✅ הצפנת סיסמאות עם bcrypt

### ולידציה
- ✅ ולידציה מלאה של כל השדות
- ✅ הודעות שגיאה ברורות בעברית
- ✅ בדיקת טלפון ישראלי
- ✅ בדיקת אימייל תקין

## 🛠️ טכנולוגיות

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

## 📋 דרישות מערכת

- Node.js (גרסה 14 ומעלה)
- MongoDB (גרסה 4.4 ומעלה)
- npm או yarn

## 🚀 התקנה והפעלה

### 1. שכפול הפרויקט
```bash
git clone <repository-url>
cd business-cards-api
```

### 2. התקנת תלויות
```bash
npm install
```

### 3. הגדרת משתני סביבה
צור קובץ `config.env` עם ההגדרות הבאות:

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

### 4. הפעלת MongoDB
ודא ש-MongoDB רץ על הפורט 27017

### 5. הפעלת השרת
```bash
npm start
# או
node app.js
```

השרת יופעל על `http://localhost:3000`

## 📚 API Endpoints

### משתמשים (Users)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/users/register` | רישום משתמש חדש | Public |
| POST | `/users/login` | התחברות משתמש | Public |
| GET | `/users/me` | קבלת פרטי המשתמש הנוכחי | Private |
| PUT | `/users/me` | עדכון פרטי המשתמש | Private |
| PATCH | `/users/me/business` | שינוי סטטוס עסקי | Private |
| GET | `/users` | קבלת כל המשתמשים | Admin |
| GET | `/users/:id` | קבלת משתמש לפי ID | Self/Admin |
| PUT | `/users/:id` | עדכון משתמש | Self/Admin |
| DELETE | `/users/:id` | מחיקת משתמש | Self/Admin |

### כרטיסי עסק (Cards)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/cards` | קבלת כל הכרטיסים | Public |
| GET | `/cards/:id` | קבלת כרטיס לפי ID | Public |
| GET | `/cards/my-cards` | קבלת הכרטיסים שלי | Private |
| POST | `/cards` | יצירת כרטיס חדש | Business |
| PUT | `/cards/:id` | עדכון כרטיס | Owner/Admin |
| PATCH | `/cards/:id` | לייק לכרטיס | Private |
| DELETE | `/cards/:id` | מחיקת כרטיס | Owner/Admin |
| PATCH | `/cards/:id/biz-number` | שינוי מספר עסקי | Admin |

### Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | בדיקת תקינות השרת |

## 🔐 אימות והרשאות

### טיפוסי משתמשים
- **משתמש רגיל**: יכול לנהל את הפרופיל שלו
- **משתמש עסקי**: יכול ליצור ולנהל כרטיסי עסק
- **אדמין**: גישה מלאה לכל הפונקציות

### שימוש ב-JWT
```javascript
// הוספת טוקן ל-header
Authorization: Bearer <your-jwt-token>
```

## 📝 דוגמאות שימוש

### רישום משתמש חדש
```javascript
POST /users/register
{
  "name": {
    "first": "יוסי",
    "last": "כהן",
    "middle": ""
  },
  "phone": "0501234567",
  "email": "yossi@example.com",
  "password": "1234567",
  "address": {
    "country": "ישראל",
    "city": "תל אביב",
    "street": "דיזנגוף",
    "houseNumber": 1,
    "zip": 12345
  }
}
```

### יצירת כרטיס עסקי
```javascript
POST /cards
Authorization: Bearer <token>
{
  "title": "מסעדה טובה",
  "subtitle": "אוכל טעים",
  "description": "המסעדה הטובה ביותר בעיר",
  "phone": "0509876543",
  "email": "restaurant@example.com",
  "web": "https://restaurant.com",
  "address": {
    "country": "ישראל",
    "city": "תל אביב",
    "street": "אלנבי",
    "houseNumber": 10,
    "zip": 54321
  }
}
```

## 🧪 בדיקות

הפרויקט כולל בדיקות מקיפות לכל ה-endpoints:

### בדיקות שבוצעו:
- ✅ רישום והתחברות משתמשים
- ✅ אימות והרשאות
- ✅ יצירה ועדכון כרטיסים
- ✅ ולידציה ושגיאות
- ✅ ניהול משתמשים וסטטוסים

## 📁 מבנה הפרויקט

```
├── controllers/          # לוגיקה עסקית
│   ├── cardsController.js
│   └── usersController.js
├── middleware/           # Middleware functions
│   ├── auth.js          # אימות והרשאות
│   ├── errorHandler.js  # טיפול בשגיאות
│   ├── fileLogger.js    # רישום לקובץ
│   └── validation.js    # ולידציה
├── models/              # מודלים של MongoDB
│   ├── Card.js
│   └── User.js
├── routes/              # נתיבי API
│   ├── cards.js
│   └── users.js
├── utils/               # פונקציות עזר
│   └── initialData.js   # נתונים ראשוניים
├── logs/                # קבצי לוג
├── app.js               # קובץ השרת הראשי
├── config.env           # משתני סביבה
└── package.json         # תלויות הפרויקט
```

## 🔧 פיתוח

### הרצה במצב פיתוח
```bash
npm run dev
```

### יצירת נתונים ראשוניים
השרת יוצר אוטומטית נתונים ראשוניים בהפעלה ראשונה.

## 📞 תמיכה

לשאלות ותמיכה, צור issue ב-GitHub repository.

## 📄 רישיון

פרויקט זה מופץ תחת רישיון MIT.




