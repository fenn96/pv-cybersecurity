import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
        <>
        <div style={{
            backgroundColor: '#262626',
            backgroundImage: "linear-gradient(to right, rgba(38, 40, 36, 1) 0%, rgba(38, 40, 36, 0) 100%), url('https://www.nrel.gov/news/program/2022/images/20221024-increased-spacing-of-solar-panels-comes-with-benefits-65308.jpg')",
            backgroundSize: '90%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            height: '100vh'
          }}>
            <div style={{ top: '10px', right: '10px' }}>
                <button className="btn btn-secondary">Home</button>
                <button className="btn btn-secondary">Blog</button>
                <button className="btn btn-secondary">About Us</button>
                <button className="btn btn-secondary">Contact Us</button>
            </div>
            
        <div style={{ margin: '3in 0 0 2in', color: 'white' }}>
            <div className="row">
                <div className="col-md-12 my-5">
                    <h1 className="display-2 fw-bold mb-5">Solar Watchdog</h1>
                    <h1>AI Backed Security</h1>
                    <p>Cybersecurity system created to monitor high risk solar panels</p>
                    <Link to="/login" className="btn btn-secondary">Login</Link>
                    <Link to="/signup" className="btn btn-secondary">Sign Up</Link>
                </div>
            </div>
        </div>
        </div>
    </>
  )
}

export default Home