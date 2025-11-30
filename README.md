# 📝 Todo List — MERN Stack (TypeScript + Vite + Tailwind)

A full-stack Todo List application built using the MERN stack with TypeScript on both frontend and backend. This project features creating, updating, deleting, and viewing todos with JWT authentication and a modern React UI.

![Todo List Banner](https://img.shields.io/badge/MERN-Stack-success) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white) ![License](https://img.shields.io/badge/license-MIT-blue)

---

## 🚀 Tech Stack

### Backend
- **Node.js** + **Express.js** - Server framework
- **TypeScript** - Type-safe backend code
- **MongoDB** + **Mongoose** - Database and ODM
- **JWT** - Secure authentication
- **bcrypt** - Password hashing
- **dotenv** - Environment variables
- **Nodemon** + **ts-node** - Hot reload in development
- Compiled to JavaScript in `dist/` folder

### Frontend
- **React 19** (Vite) - Fast development and build
- **TypeScript** - Type-safe frontend code
- **TailwindCSS 4** - Modern utility-first styling
- **Axios** - HTTP client with interceptors
- **React Router DOM** - Client-side routing
- **Formik** - Form handling and validation
- **Lucide React** - Beautiful icon library
- **React Hot Toast** - Toast notifications

### Monorepo Tools
- **Concurrently** - Run frontend & backend simultaneously in development

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/todo-list.git
cd todo-list
```

### 2. Install all dependencies

Install both frontend and backend dependencies:
```bash
npm run install-all
```

Or install manually:
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies
cd ../backend && npm install
```

### 3. Environment Variables

Create a `.env` file inside the **backend** folder:
```env
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todolist?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
```


### 4. Run the Application

#### Development Mode (Frontend + Backend)

Run both servers concurrently:
```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

#### Run Separately

**Backend only:**
```bash
cd backend
npm run dev
```

**Frontend only:**
```bash
cd frontend
npm run dev
```

## ✨ Features

### Frontend Features
- 🎨 Beautiful, responsive UI with **TailwindCSS**
- ✅ Form validation using **Formik**
- 🔐 User authentication (Login & Register)
- ➕ Add, edit, delete, and view todos
- 🔔 Toast notifications for user feedback
- 📱 Fully responsive design
- 🎯 Mark todos as complete/incomplete
- 🔄 Real-time UI updates
- 🚀 Fast page loads with **Vite**

### Backend Features
- 🔒 Secure JWT authentication
- 🔑 Password hashing with **bcrypt**
- 📊 RESTful API design
- ✅ Input validation
- 🗄️ MongoDB database with **Mongoose**
- 🛡️ Protected routes with middleware
- 🏗️ Clean MVC architecture
- 📝 TypeScript for type safety

