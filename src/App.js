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

const App = () => {
  const dispatch = useDispatch();
  const [notification, setNotification] = []

  const navigate = useNavigate()

  const handleRegistration = async (user) => {
    try {
      await ownerService.signup(user)
      navigate('/login')
    } catch (exception) {
      console.log(exception)
      /*handleNotification(exception.response.data.error, 4)*/
    }
  }

  const handleLogin = async (user) => {
    try {
      await loginService.login(user)
        .then(response => {
          localStorage.setItem('token', response);
          navigate('/dashboard')
        })
    } catch (exception) {
      console.log(exception)
      /*handleNotification(exception.response.data.error, 4)*/
    }
  }

  const handleLogout = async (user) => {
    try {
      await loginService.logout()
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
        <Route path="/login" element={<Login loginUser={handleLogin} notification={notification} />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Register registerUser={handleRegistration} notification={notification} />} />
        <Route path="/dashboard" element={<Dashboard logoutUser={handleLogout} />} />
        <Route path="/admin" element={<Admin logoutUser={handleLogout} />} />
      </Routes>

    </div>
  )
}

export default App;
