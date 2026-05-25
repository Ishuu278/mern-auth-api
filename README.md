# 🔐 JWT Authentication Backend

A production-structured **REST API** built with Node.js, Express, MongoDB, and JWT — featuring secure user registration with cookie-based token storage.

---

## 🚀 Features

- ✅ User registration with duplicate email check
- ✅ JWT token generation signed with environment secret
- ✅ Cookie-based token storage
- ✅ MongoDB Atlas integration via Mongoose
- ✅ Schema-level unique email validation
- ✅ Modular project structure (MVC pattern)
- ✅ Environment variables with dotenv
- ✅ Hot reload with nodemon

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express.js v5 |
| Database | MongoDB Atlas |
| ODM | Mongoose v9 |
| Auth | JSON Web Token (jsonwebtoken) |
| Password | bcrypt *(in progress)* |
| Cookies | cookie-parser |
| Config | dotenv |
| Dev Tool | nodemon |

---

## 📁 Project Structure

```
BCRYPT/
├── src/
│   ├── config/
│   │   └── database.js        # MongoDB connection function
│   ├── models/
│   │   └── user.model.js      # Mongoose user schema + model
│   ├── routes/
│   │   └── auth.routes.js     # Auth endpoints (register, login)
│   ├── app.js                 # Express app, middleware, routes
│   └── server.js              # Entry point — DB connect + listen
├── .env                       # Environment secrets (not committed)
├── .gitignore
└── package.json
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/authDB
JWT_SECRET=your_super_secret_key_here
PORT=3000
```

### 4. Run the development server

```bash
npm run dev
```

Server starts at `http://localhost:3000`

---

## 📡 API Endpoints

### `POST /api/auth/register`

Register a new user.

**Request Body**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Success Response — `201 Created`**
```json
{
  "message": "user registered",
  "user": {
    "_id": "65c0a9b...",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response — `400 Bad Request`** *(duplicate email)*
```json
{
  "message": "user already exist with this email address"
}
```

---

## 🔐 How Authentication Works

```
Client → POST /api/auth/register
           │
           ▼
    Check if email exists  ──exists──▶  400 Error
           │
        not found
           │
           ▼
    Create user in MongoDB
           │
           ▼
    Sign JWT token (id + email + JWT_SECRET)
           │
           ▼
    Set token in cookie
           │
           ▼
    Return 201 with user + token
```

---

## 🗄️ Database Schema

```js
// user.model.js
const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: [true, "with this email user account already exist"]
  },
  password: String
})
```

---

## 📦 Dependencies

```json
{
  "cookie-parser": "^1.4.7",
  "dotenv": "^17.4.2",
  "express": "^5.2.1",
  "jsonwebtoken": "^9.0.3",
  "mongoose": "^9.6.2"
}
```

---

## 🔮 What's Coming Next

- [ ] `POST /api/auth/login` — login with email & password
- [ ] `bcrypt` password hashing before storing in DB
- [ ] `GET /api/auth/profile` — protected route with JWT middleware
- [ ] Input validation with `express-validator`
- [ ] Refresh token support
- [ ] Logout endpoint (clear cookie)

---

## 🧪 Testing with Postman

1. Open Postman
2. Set method to `POST`
3. URL: `http://localhost:3000/api/auth/register`
4. Body → raw → JSON
5. Paste the request body and hit Send

---

## 🌱 Learning Journey

This project is part of my backend development learning path. I'm actively building real projects to understand:

- How authentication works under the hood
- Why security practices like httpOnly cookies and JWT secrets matter
- How to structure a Node.js project professionally
- How MongoDB + Mongoose work together for data modeling

---

## 📄 License

MIT — feel free to use this as a reference for your own learning.

---

> Built with ❤️ while learning backend development | Open to internships & junior backend roles
