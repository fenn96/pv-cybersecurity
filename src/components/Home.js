import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <>
    <div className="container-fluid img-background text-center" style={{ height: '55vh'}}>
    <nav className="navbar navbar-expand-lg">
      <Link className='navbar-brand'>Solar Watchdog</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <NavLink to="/" className="nav-link pb-2 pt-2">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/blog" className="nav-link pb-2 pt-2">
              Blog
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
    <div className='d-flex justify-content-center'>
      <div className="row">
        <div className="col">
          <h1>Solar Watchdog</h1>
          <p>Cybersecurity system created to monitor high risk solar panel setups.</p>
          <Link to="/signup" className="btn btn-lg btn-outline-warning text-white">
            Get Started
          </Link>
        </div>
      </div>
    </div>
    </div>
    <div className='container-fluid p-5 bg-light text-black' style={{ height: '45vh'}}>
      <h2 className='text-center pb-4'>Services</h2>
      <div className="row gx-5">
        <div className="col-md-4">
          <div className='card'>
            <div className="card-body">
              <div className='text-center'>
                <span className="material-symbols-outlined">lock</span>
              </div>
              <h4 className="card-title text-center">Cybersecurity Monitoring</h4>
              <p className="card-text">Our Solar Dashboard uses AI algorithms to monitor your solar panel setups 24/7, and alerts you to any suspicious activity. With advanced threat detection capabilities, Solar Dashboard provides real-time protection against cyberattacks, data breaches, and other security risks. We offer customizable settings to help you monitor your system effectively, and ensure your solar panel installations remain safe and secure.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className='card'>
            <div className="card-body">
              <div className='text-center'>
                <span className="material-symbols-outlined">warning</span>
              </div>
              <h4 className="card-title text-center">Threat Intelligence</h4>
              <p className="card-text">Our AI-powered Solar Dashboard leverages big data and machine learning to provide you with advanced threat intelligence insights. We collect and analyze data from various sources to identify potential cyber threats, and provide you with proactive alerts and notifications. With Solar Dashboard, you can stay ahead of the curve and be well-informed about the latest security trends and potential risks to your solar panel system.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className='card'>
            <div className="card-body">
              <div className='text-center'>
                <span className="material-symbols-outlined">warning</span>
              </div>
              <h4 className="card-title text-center">Incident Response</h4>
              <p className="card-text">Our Solar Dashboard provides you with a comprehensive incident response plan that helps you quickly respond to any cyberattacks on your solar panel system. We offer step-by-step guidance to mitigate the impact of an attack, minimize damage, and recover your system as quickly as possible. With Solar Dashboard, you can have peace of mind knowing that you have a dedicated team of security experts to support you in the event of a cybersecurity incident.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home