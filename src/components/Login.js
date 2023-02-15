import { useField } from '../hooks/index'
import { Link } from "react-router-dom"
import SidebarMenu from 'react-bootstrap-sidebar-menu'

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
        <div class="row m-5 no-gutters shadow-lg">
          <div class="col-md-6 d-none d-md-block">
            <img src="https://images.unsplash.com/photo-1566888596782-c7f41cc184c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80" class="img-fluid" />
          </div>
          <div class='col-md-6 bg-white p-5'>
            <h3 class='pb-3'>Sign In</h3>
            <div class='form-style'>
              <form onSubmit={handleSubmit}>
                <div class='form-group pb-3'>
                  <input class='form-control' placeholder='Email' {...email} />
                </div>
                <div class="form-group pb-3">
                  <input class='form-control' placeholder='Password' {...password} />
                </div>
                <div class="form-group pb-3">
                  <input class='form-control' placeholder='Repeat Password' {...passwordRepeat} />
                </div>
                <button class='btn btn-primary w-100 font-weight-bold mt-2'>Login</button>
              </form>
              <div class='pt-4 text-center'>
                Not yet registered? <Link to="/signup">Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  
  }

export default Login;