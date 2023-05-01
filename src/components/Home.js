import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../img/logo.png';

const Home = () => {
  return (
    <>
    <div className="container-fluid img-background text-center" style={{ height: '55vh'}}>
    <nav className="navbar navbar-expand-lg">
      <Link className='navbar-brand'><img src={logo} alt="logo" style={{ height: '64px', width: '64px'}} /></Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
          <Link to="/login" className="nav-item btn btn-outline-warning text-white">
            Login
          </Link>
          </li>
        </ul>
      </div>
    </nav>
    <div className='d-flex justify-content-center' style={{ paddingTop: '10vh'}}>
      <div className="row">
        <div className="col">
          <h1>PV Solar Monitoring</h1>
          <p>Cybersecurity system created to monitor high risk solar panel setups.</p>
          <Link to="/signup" className="btn btn-lg btn-outline-warning text-white">
            Get Started
          </Link>
        </div>
      </div>
    </div>
    </div>
    <div className='container-fluid p-5 bg-light text-black' style={{ height: '41vh'}}>
      <h2 className='text-center pb-4'>Services</h2>
      <div className="row gx-5 mt-5">
        <div className="col-md-4">
          <div className='card border-light shadow'>
            <div className="card-body">
              <div className='text-center text-warning'>
                <span className="material-symbols-outlined" style={{ fontSize: '5rem' }}>lock</span>
              </div>
              <h4 className="card-title text-center">Cybersecurity Monitoring</h4>
              <p className="card-text text-center text-secondary">Using AI, Solar Dashboard monitors solar panels for suspicious activity and provides real-time protection against security risks.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className='card border-light shadow'>
            <div className="card-body">
              <div className='text-center text-warning'>
                <span className="material-symbols-outlined" style={{ fontSize: '5rem' }}>warning</span>
              </div>
              <h4 className="card-title text-center">Threat Intelligence</h4>
              <p className="card-text text-center text-secondary">Solar Dashboard uses AI, big data, and machine learning to provide advanced threat intelligence insights for solar panels.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className='card border-light shadow'>
            <div className="card-body">
              <div className='text-center text-warning'>
                <span className="material-symbols-outlined" style={{ fontSize: '5rem' }}>email</span>
              </div>
              <h4 className="card-title text-center">Incident Response</h4>
              <p className="card-text text-center text-secondary">Solar Dashboard provides a comprehensive incident response plan for quick response to cyberattacks on solar panels.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer>
  <div className="container">
    <div className="row mt-2">
      <div className="col">
        <p className='text-center'>&copy; 2023 PV Solar Monitoring. All Rights Reserved.</p>
      </div>
    </div>
  </div>
</footer>
    </>
  )
}

export default Home