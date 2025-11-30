import { Routes, Route, Navigate, useNavigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import React, { lazy, Suspense } from "react"
import { Loader } from "lucide-react";

const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const Notes = lazy(() => import("./pages/Notes"));
const NoteForm = lazy(() => import("./pages/NoteForm"));

const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-96">
    <Loader size={40} className="text-white font-bold animate-spin"/>
  </div>
);

function ProtectedRoute({ children }: React.PropsWithChildren) {
  const token = localStorage.getItem("token");
  
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function App() {

  const navigate = useNavigate();

  return (
    <div>
       <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center mt-14 mb-6 cursor-pointer' onClick={()=>navigate('/home')} >
        TODO <span className='text-blue-500'>LIST</span>
      </h1>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/notes" element={<ProtectedRoute><Notes /></ProtectedRoute>} />
          <Route path="/note/:id?" element={<ProtectedRoute><NoteForm /></ProtectedRoute>} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
