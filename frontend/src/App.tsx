import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom"
import React from "react"
import { Toaster } from 'react-hot-toast'
import { LogOut } from 'lucide-react'
import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Notes from "./pages/Notes"
import NoteForm from "./pages/NoteForm"

function ProtectedRoute({ children }: React.PropsWithChildren) {
  const token = localStorage.getItem("token");
  
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  
  const showLogout = token && location.pathname !== '/' && location.pathname !== '/register';

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="">
      <Toaster position="top-center" />
      
      <div className="flex justify-between items-center px-4 sm:px-8 lg:px-16 mt-8 mb-4">
        <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center flex-1 cursor-pointer'
        onClick={()=>navigate('/home')}
        >
          TODO <span className='text-blue-500'>LIST</span>
        </h1>
        
        {showLogout && (
          <button
            onClick={handleLogout}
            className=" text-red-500  hover:text-red-600 font-bold p-4 rounded-full transition-colors"
          >
            <LogOut size={20} />
          </button>
        )}
      </div>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/notes" element={<ProtectedRoute><Notes /></ProtectedRoute>} />
        <Route path="/note/:id?" element={<ProtectedRoute><NoteForm /></ProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default App
