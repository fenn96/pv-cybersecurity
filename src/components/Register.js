import { useField } from '../hooks/index'
import { Link } from "react-router-dom"

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

export default Register;