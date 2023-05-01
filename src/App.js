import { useDispatch } from 'react-redux'
import { resetOwnerState } from './reducers/ownerReducer'
import {
  BrowserRouter as Router,
  Routes, Route, useNavigate
} from "react-router-dom"
import ownerService from './services/owner'
import loginService from './services/login'
import Login from './components/Login.js'
import Register from './components/Register.js'
import Dashboard from './components/Dashboard.js'
import Admin from './components/Admin.js'
import Home from './components/Home'
import { useState } from 'react'

const App = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate()

  const handleNotification = (notification, type) => {
    if (type === "message") {
      setMessage(notification);
    } else if (type === "error") {
      console.log(notification)
      setError(notification);
    }

    setTimeout(() => {
      if (type === "message") {
        setMessage('');
      } else if (type === "error") {
        setError('');
      }
    }, 3500)
  }

  const handleRegistration = async (user) => {
    try {
      await ownerService.signup(user).then(response => {
        console.log(response)
        navigate('/login')
      })
    } catch (exception) {
      console.log(exception)
      handleNotification(exception.response.data.error, 'error');
    }
  }

  const handleLogin = async (user) => {
    try {
      await loginService.login(user)
        .then(response => {
          localStorage.setItem('token', response);
          navigate('/dashboard')
        })
        .error(error => {
          handleNotification(error.response.data.error, 'error');
        })
    } catch (exception) {
      console.log(exception)
      handleNotification(exception.response.data.error, 'error');
    }
  }

  const handleLogout = async (user) => {
    try {
      await loginService.logout();
      localStorage.removeItem('token');
      dispatch(resetOwnerState());
      navigate('/login')
    } catch (exception) {
      console.log(exception)
    }
  }

  /*const handleNotification = (notification, seconds) => {
    setNotification(notification)
    setTimeout(() => {
      setNotification('')
    }, seconds * 1000)
  }*/

  return (
    <div>

      <Routes>
        <Route path="/login" element={<Login loginUser={handleLogin} handleNotification={handleNotification} message={message} error={error} />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Register registerUser={handleRegistration} handleNotification={handleNotification} message={message} error={error} />} />
        <Route path="/dashboard" element={<Dashboard logoutUser={handleLogout} />} />
        <Route path="/admin" element={<Admin logoutUser={handleLogout} />} />
      </Routes>

    </div>
  )
}

export default App;
