import React from 'react'
import Clock from './Clock'
import icons from '../img';

const Weather = ({ weather }) => {
  return (
    <div className="card bg-dark p-3">
        <p className='text-center'>Weather</p>
            <div className='row mx-5'>
                <div className="d-flex">
                    <img className="img-fluid" style={{ maxWidth: "14rem", maxHeight: "14rem" }} src={icons[weather.iconPath]} alt={weather.description} />
                    <div className='mt-5 d-flex'>
                      <h1 className='display-1' style={{ fontSize: "6rem" }}>{weather.temp}</h1>
                      <p style={{ fontSize: "2rem" }}>°F</p>
                      <div className='px-5 text-secondary'>
                        <div>Humidity: {weather.humidity}%</div>
                        <div>Wind: {weather.wind_speed} mph</div>
                        <div>Feels Like: {weather.temp_feels_like} °F</div>
                      </div>
                    </div>
                    <div className='m-auto'>
                      <div>{weather.location}</div>
                      <Clock />
                    </div>
                </div>
        </div>
    </div>
  )
}

export default Weather