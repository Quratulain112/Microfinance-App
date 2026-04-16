import React from 'react'
import HomePage from './pages/Home.jsx'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Layout/Navbar.jsx'
import Register from './pages/Register.jsx'
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login.jsx'
import ChangePassword from './pages/ChangePassword.jsx'
import Footer from './components/Layout/Footer.jsx'
import Dashboard from './pages/Dashboard.jsx'

const App = () => {

  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/loan-form');

  return (
    <>
      <div className='min-h-screen bg-slate-50'>
        {!isDashboard && <Navbar />}
        <div className={!isDashboard ? "pt-20" : ""}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
        <Footer/>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />

    </>
  )
}

export default App