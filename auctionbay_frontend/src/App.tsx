import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'
import { BrowserRouter as Router, Route,Routes, Link } from 'react-router-dom';
import InitPage from './components/InitPage'
import Signup from './pages/AuthPages/Signup';
import Login from './pages/AuthPages/Login';
import ResetPassword from './pages/AuthPages/ResetPassword';
import HomePage from './pages/Home/HomePage';
//import EditProfile from './pages/Home/EditProfile';



function App() {
  

  return (
    <Router>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/login" element={<InitPage />} />
      <Route path="/ResetPassword" element={<ResetPassword />} />
      <Route path="/ResetPassword" element={<ResetPassword />} /> 
      <Route path="/me" element={<ResetPassword />} />
    </Routes>
  </Router> 
  )
}

export default App
