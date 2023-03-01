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
      <div class='container'>
        <div class="m-5">
          <div class='img-background border-radius shadow-custom p-5' style={{ minHeight: 600 }}>
            <p class='pb-3 fw-bold'>PV Solar Monitoring</p>
            <div class='p-4'>
              <h1 class='pb-2 pt-5'>Sign into your Account<span class='text-warning'>.</span></h1>
              <div class='pb-5 text-secondary'>
                Not yet registered? <Link to="/signup" className='text-warning text-decoration-none'>Sign Up</Link>
              </div>
              <div class='form-style pb-4 col-5'>
                <form class='form-floating' onSubmit={handleSubmit}>
                  <div class='form-group pb-3'>
                    <input class='form-control border-dark input-border-radius bg-dark text-white form-control-lg' placeholder='Email' {...email} />
                  </div>
                  <div class="form-group pb-3">
                    <input class='form-control border-dark input-border-radius bg-dark text-white form-control-lg' placeholder='Password' {...password} />
                  </div>
                  <div class="form-group pb-5">
                    <input class='form-control border-dark input-border-radius bg-dark text-white form-control-lg' placeholder='Repeat Password' {...passwordRepeat} />
                  </div>
                  <div class='col-5'>
                    <button class='btn btn-outline-warning btn-lg text-white w-100 font-weight-bold mt-2'>Login</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  
  }

export default Login;