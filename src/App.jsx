import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route , Routes, BrowserRouter as Router} from 'react-router-dom' ;
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import { ToastContainer, toast } from 'react-toastify';
import SendMoney  from  './pages/SendMoney';
import AuthLayout from './components/AuthLayout';
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <AuthLayout>
            <Dashboard />
          </AuthLayout>
          }></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/sendmoney" element={
          <AuthLayout>
            <SendMoney />
          </AuthLayout>
          }></Route>
      </Routes>
      <ToastContainer />
    </Router>
  )
}

export default App
