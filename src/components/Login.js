import { useField } from '../hooks/index'
import { Link } from "react-router-dom"

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

export default Login;