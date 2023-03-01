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
      <div class='container'>
        <div class="m-5">
          <div class='img-background border-radius shadow-custom p-5' style={{ minHeight: 600 }}>
            <p class='pb-3 fw-bold'>PV Solar Monitoring</p>
            <div class='p-4'>
            <h1 class='pb-2 pt-5'>Create a new account<span class='text-warning'>.</span></h1>
            <div class='pb-5 text-secondary'>
              Already registered? <Link to="/" className='text-warning text-decoration-none'>Log In</Link>
            </div>
            <div class='form-style pb-4 col-5'>
            <form onSubmit={handleSubmit}>
              <div class='row pb-3'>
                <div class='form-group col-6'>
                  <input class='form-control border-dark input-border-radius bg-dark text-white form-control-lg' placeholder='First Name' {...firstName} />
                </div>
                <div class='form-group col-6'>
                  <input class='form-control border-dark input-border-radius bg-dark text-white form-control-lg' placeholder='Last Name' {...lastName} />
                </div>
              </div>
              <div class='form-group pb-3'>
                <input class='form-control border-dark input-border-radius bg-dark text-white form-control-lg' placeholder='Email' {...email} />
              </div>
              <div class='form-group pb-3'>
                <input class='form-control border-dark input-border-radius bg-dark text-white form-control-lg' placeholder='Password' {...password} />
              </div>
              <div class='form-group pb-5'>
                <input class='form-control border-dark input-border-radius bg-dark text-white form-control-lg' placeholder='Repeat Password' {...passwordRepeat} />
              </div>
              <div class='col-5'>
                <button class='btn btn-outline-warning btn-lg text-white w-100 font-weight-bold mt-2'>Sign Up</button>
              </div>
            </form>
            </div>
            </div>
          </div>
        </div>
      </div>
    )
  
}

export default Register;