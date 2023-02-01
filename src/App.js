import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setOwner, resetOwnerState } from './reducers/ownerReducer'
import { useField } from './hooks/index'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useNavigate, NavLink
} from "react-router-dom"
import ownerService from './services/owner'
import loginService from './services/login'

const Login = (props) => {

  const email = useField('text')
  const password = useField('password')
  const passwordRepeat = useField('password')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.loginUser({
      email: email.value,
      password: password.value,
      passwordRepeat: passwordRepeat.value
    })
  }

  return (
    <div>
      <h2>login</h2>
      <p>{props.notification}</p>
      <form onSubmit={handleSubmit}>
        <div>
          email
          <input {...email} />
        </div>
        <div>
          password
          <input {...password} />
        </div>
        <div>
          repeat password
          <input {...passwordRepeat} />
        </div>
        <button>login</button><Link to="/signup"><button>register</button></Link>
      </form>
    </div>
  )

}

const Register = (props) => {

  const firstName = useField('text')
  const lastName = useField('text')
  const email = useField('text')
  const password = useField('password')
  const passwordRepeat = useField('password')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(firstName)
    props.registerUser({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      passwordRepeat: passwordRepeat.value
    })
  }

  return (
    <div>
      <h2>register</h2>
      <p>{props.notification}</p>
      <form onSubmit={handleSubmit}>
        <div>
          first name
          <input {...firstName} />
        </div>
        <div>
          last name
          <input {...lastName} />
        </div>
        <div>
          email
          <input {...email} />
        </div>
        <div>
          password
          <input {...password} />
        </div>
        <div>
          repeat password
          <input {...passwordRepeat} />
        </div>
        <button>register</button><Link to="/"><button>login</button></Link>
      </form>
    </div>
  )

}

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const owner = useSelector(state => state.owner);
  const solarData = useSelector(state => state.solarData);

  useEffect(() => {
    const cookie = document.cookie
      .split(';')
      .find((c) => c.trim().startsWith('token='));

    if (cookie) {
      const token = cookie.split("=")[1];
      console.log(token)

      ownerService.getOwner({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        dispatch(setOwner({
          firstName: data.owner.firstName,
          lastName: data.owner.lastName,
          email: data.owner.email,
          id: data.owner.id,
          solarPanels: data.owner.solarPanels
        }));
      });
    } 
    
  },[])

  console.log(owner)

  return (
    <div>
      <h1>dashboard</h1>
      <nav>
        <NavLink to="/dashboard">
          Dashboard
        </NavLink>
        <NavLink to="/analytics">
          Analytics
        </NavLink>
        <NavLink onClick={props.logoutUser}>
          Log out
        </NavLink>
      </nav>
      <main>
        <p>{owner.firstName}</p>
        <div>
          <h3>Voltage</h3>
          <p>{solarData.voltage}</p>
        </div>
        <div>
          <h3>Current</h3>
          <p>{solarData.current}</p>
        </div>
        <div>
          <h3>Power</h3>
          <p>{solarData.power}</p>
        </div>
      </main>
    </div>
  )

}

const App = () => {
  const dispatch = useDispatch();
  const [notification, setNotification] = []

  const navigate = useNavigate()

  const handleRegistration = async (user) => {
    try {
      console.log(user)
      await ownerService.signup(user)
      navigate('/')
    } catch (exception) {
      console.log(exception)
      /*handleNotification(exception.response.data.error, 4)*/
    }
  }

  const handleLogin = async (user) => {
    try {
      await loginService.login(user)
      navigate('/dashboard')
    } catch (exception) {
      console.log(exception)
      /*handleNotification(exception.response.data.error, 4)*/
    }
  }

  const handleLogout = async (user) => {
    try {
      await loginService.logout()
      dispatch(resetOwnerState());
      navigate('/')
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
        <Route path="/" element={<Login loginUser={handleLogin} notification={notification} />} />
        <Route path="/signup" element={<Register registerUser={handleRegistration} notification={notification} />} />
        <Route path="/dashboard" element={<Dashboard logoutUser={handleLogout} />} />
      </Routes>

    </div>
  )
}

export default App;
