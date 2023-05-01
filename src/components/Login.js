import { useField } from '../hooks/index'
import { Link } from "react-router-dom"

const Login = (props) => {
    const email = useField('text')
    const password = useField('password')

    const handleSubmit = (e) => {
        e.preventDefault()
        props.loginUser({
          email: email.value,
          password: password.value
        })
      }
  
    return (
      <div className='container'>
        <div className="m-5">
          <div className='img-background border-radius shadow-custom p-5' style={{ minHeight: 600 }}>
            <p className='pb-3 fw-bold'>PV Solar Monitoring</p>
            <div className='p-4'>
              <h1 className='pb-2 pt-5'>Sign into your Account<span className='text-warning'>.</span></h1>
              <div className='pb-5 text-secondary'>
                Not yet registered? <Link to="/signup" className='text-warning text-decoration-none'>Sign Up</Link>
              </div>
              <div className='form-style pb-4 col-5'>
                <form className='form-floating' onSubmit={handleSubmit}>
                  <div className='form-group pb-3'>
                    <input className='form-control border-dark input-border-radius bg-dark text-white form-control-lg' placeholder='Email' {...email} />
                  </div>
                  <div className="form-group pb-3">
                    <input className='form-control border-dark input-border-radius bg-dark text-white form-control-lg' placeholder='Password' {...password} />
                  </div>
                  <div className='col-5'>
                    <button className='btn btn-outline-warning btn-lg text-white w-100 font-weight-bold mt-2'>Login</button>
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