import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link, NavLink } from "react-router-dom"
import { setOwner } from '../reducers/ownerReducer'
import ChartStreaming from 'chartjs-plugin-streaming';
import 'chartjs-adapter-luxon';
import { CategoryScale, LinearScale, ArcElement, PointElement, LineElement, Filler, Chart } from "chart.js";
import { Line, Doughnut } from 'react-chartjs-2';
import ownerService from '../services/owner'
import solarService from '../services/solar'
import Weather from './Weather';
import { ClipLoader } from 'react-spinners';
import logo from '../img/logo.png';

Chart.register(ChartStreaming, CategoryScale, LinearScale, ArcElement, PointElement, LineElement, Filler)

const Dashboard = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasSolar, setHasSolar] = useState(false);
  const dispatch = useDispatch();
  const owner = useSelector(state => state.owner);
  const currentDate = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
      ownerService.getOwner(token)
        .then((data) => {
          if (!data.authenticated) {
            navigate('/login');
          } else {
            dispatch(setOwner({
              firstName: data.owner.firstName,
              lastName: data.owner.lastName,
              email: data.owner.email,
              id: data.owner.id,
              authenticated: data.authenticated,
              type: data.owner.type,
              geo: data.owner.geo
            }));
            if ( data.owner.type === "Admin") {
              navigate('/admin');
            }
            if (data.owner.solarPanels.length > 0) {
              setHasSolar(true);
              solarService.getWeatherData({
                lat: data.owner.geo.lat,
                lon: data.owner.geo.lon,
                token: token
              })
                .then((data) => {
                  dispatch(setOwner({
                    weather: {
                      location: data.location,
                      description: data.description,
                      humidity: data.humidity,
                      iconPath: data.iconPath,
                      temp: data.temp,
                      temp_feels_like: data.temp_feels_like,
                      wind_speed: data.wind_speed
                    }
                  }));
                  setIsLoading(false);
                })
                .catch((err) => {
                  console.log(err)
                })
            } else {
              setHasSolar(false);
              setIsLoading(false);
            }
          }
        })
        .catch((error) => {
          console.log(error)
          if (error.response.status === 401) {
            navigate('/login');
          }
        });
    }
    
    /*const timer = setInterval(() => {
      const cookie = document.cookie
      .split(';')
      .find((c) => c.trim().startsWith('token='));

      const token = cookie.split("=")[1];
      ownerService.getOwner({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        if (data.authenticated) {
          dispatch(setOwner({
            solarData: data.owner.solarPanels[0].solarData
          }));
        }
      })
    }, 2000);

    // Clear the timer when the component unmounts
    return () => clearInterval(timer);*/
    
  ,[])

  if (isLoading) {
    return (
      <div className='d-flex'>
        <div>
          <div>
            <div className="d-flex flex-column shadow-lg p-3 bg-dark min-vh-100">
              <nav className='align-items-center'>
                <Link className='navbar-brand mb-5'><img src={logo} alt="logo" style={{ height: '36px', width: '36px', marginBottom: '20px'}} /></Link>
                <NavLink to="/dashboard" className="nav-link text-warning pb-2 pt-2">
                  <span className="material-symbols-outlined">dashboard</span>
                </NavLink>
                <NavLink className="nav-link pb-2">
                  <span className="material-symbols-outlined">analytics</span>
                </NavLink>
                <NavLink className="nav-link pb-2">
                  <span className="material-symbols-outlined">settings</span>
                </NavLink>
                <NavLink onClick={props.logoutUser} className="nav-link pb-2" style={{ position: 'absolute', bottom: 0 }}>
                  <span className="material-symbols-outlined">logout</span>
                </NavLink>
              </nav>
            </div>
          </div>
        </div>
        <main className='container-fluid pt-3' style={{ height: '100vh' }}>
          <h4>Dashboard</h4>
          <div className="d-flex" style={{ justifyContent: 'center', paddingTop: '40vh' }}>
            <ClipLoader 
              color="#fff"
              loading={isLoading}
              size={150}
            />
          </div>
        </main>
      </div>
    )
  }

  if (!hasSolar) {
    return (
      <div className='d-flex'>
        <div>
          <div>
            <div className="d-flex flex-column shadow-lg p-3 bg-dark min-vh-100">
              <nav className='align-items-center'>
                <Link className='navbar-brand mb-5'><img src={logo} alt="logo" style={{ height: '36px', width: '36px', marginBottom: '20px'}} /></Link>
                <NavLink to="/dashboard" className="nav-link text-warning pb-2 pt-2">
                  <span className="material-symbols-outlined">dashboard</span>
                </NavLink>
                <NavLink className="nav-link pb-2">
                  <span className="material-symbols-outlined">analytics</span>
                </NavLink>
                <NavLink className="nav-link pb-2">
                  <span className="material-symbols-outlined">settings</span>
                </NavLink>
                <NavLink onClick={props.logoutUser} className="nav-link pb-2" style={{ position: 'absolute', bottom: 0 }}>
                  <span className="material-symbols-outlined">logout</span>
                </NavLink>
              </nav>
            </div>
          </div>
        </div>
        <main className='container-fluid pt-3' style={{ height: '100vh' }}>
          <h4>Dashboard</h4>
          <div className="d-flex" style={{ justifyContent: 'center', paddingTop: '40vh' }}>
            No Solar Panel Connected With Account
          </div>
        </main>
      </div>
    )
  }


  const voltage = {
    datasets: [
      {
        label: 'Voltage',
        backgroundColor: 'rgba(178, 222, 39, 0.2)',
        pointRadius: 0,
        fill: true,
        borderColor: 'rgba(178, 222, 39, 1)',
        borderWidth: 1,
        tension: 0.5
      }
    ]
  }

  const current = {
    datasets: [
      {
        label: 'Current',
        backgroundColor: 'rgba(13, 180, 185, 0.2)',
        pointRadius: 0,
        fill: true,
        borderColor: 'rgba(13, 180, 185)',
        borderWidth: 1,
        tension: 0.5
      }
    ]
  }

  const power = {
    datasets: [
      {
        label: 'Power',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        pointRadius: 0,
        fill: true,
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        tension: 0.5
      }
    ]
  }

  const battery = {
    datasets: [
      {
        data: [150, 50],
        backgroundColor: [
          'rgb(102, 204, 85)',
          'rgb(47, 47, 47)'
        ]
      }
    ]
  }

  const power_consumption = {
    datasets: [
      {
        data: [250, 50],
        backgroundColor: [
          'rgba(255, 99, 70, 1)',
          'rgb(47, 47, 47)'
        ]
      }
    ]
  }

  const voltage_options = {
    scales: {
      y:
        {
          grid: {
            color: 'rgb(47, 47, 47)'
          },
          suggestedMin: 0,
          suggestedMax: 20
        },
      x: {
        type: 'realtime',
        realtime: {
          delay: 1000,
          onRefresh: chart => {
            solarService.getSolarData(token)
            .then((data) => {
              if (data.authenticated) {
                let lastSolarDatapoint = data.solarData[data.solarData.length - 1];
                let lastChartDatapoint = chart.data.datasets[0].data[chart.data.datasets[0].data.length - 1] || 0;
                if (lastSolarDatapoint._id === lastChartDatapoint.id ) {
                } else {
                  chart.data.datasets.forEach(dataset => {
                    dataset.data.push({
                      id: lastSolarDatapoint._id,
                      x: Date.now(),
                      y: lastSolarDatapoint.voltage
                    })
                  })
                }

                chart.update('quiet');
              }
      })
          }
        },
        grid: {
          color: 'rgb(47, 47, 47)'
        }
      }
    }
  };

  const current_options = {
    scales: {
      y:
        {
          grid: {
            color: 'rgb(47, 47, 47)'
          },
          suggestedMin: 0,
          suggestedMax: 2.5
        },
      x: {
        type: 'realtime',
        realtime: {
          delay: 1000,
          onRefresh: chart => {
            solarService.getSolarData(token)
            .then((data) => {
              if (data.authenticated) {
                let lastSolarDatapoint = data.solarData[data.solarData.length - 1];
                let lastChartDatapoint = chart.data.datasets[0].data[chart.data.datasets[0].data.length - 1] || 0;
                if (lastSolarDatapoint._id === lastChartDatapoint.id ) {
                } else {
                  chart.data.datasets.forEach(dataset => {
                    dataset.data.push({
                      id: lastSolarDatapoint._id,
                      x: Date.now(),
                      y: lastSolarDatapoint.current
                    })
                  })
                }

                chart.update('quiet');
              }
      })
          }
        },
        grid: {
          color: 'rgb(47, 47, 47)'
        }
      }
    }
  };

  const power_options = {
    scales: {
      y:
        {
          grid: {
            color: 'rgb(47, 47, 47)'
          },
          suggestedMin: 0,
          suggestedMax: 50
        },
      x: {
        type: 'realtime',
        realtime: {
          delay: 1000,
          onRefresh: chart => {
            solarService.getSolarData(token)
            .then((data) => {
              if (data.authenticated) {
                let lastSolarDatapoint = data.solarData[data.solarData.length - 1];
                let lastChartDatapoint = chart.data.datasets[0].data[chart.data.datasets[0].data.length - 1] || 0;
                if (lastSolarDatapoint._id === lastChartDatapoint.id ) {
                } else {
                  chart.data.datasets.forEach(dataset => {
                    dataset.data.push({
                      id: lastSolarDatapoint._id,
                      x: Date.now(),
                      y: lastSolarDatapoint.power
                    })
                  })
                }

                chart.update('quiet');
              }
      })
          }
        },
        grid: {
          color: 'rgb(47, 47, 47)'
        }
      }
    }
  };

  const doughnutOptions = {
    aspectRatio: 3.5,
    cutout: '85%',
    rotation: -110,
    circumference: 220,
    borderWidth: 0,
    backgroundColor: 'rgb(47, 47, 47)',
    arc: {
      borderWidth: 1
    }
  }

  return (
    <div className='d-flex'>
      <div>
        <div>
          <div className="d-flex flex-column shadow-lg p-3 bg-dark min-vh-100">
            <nav className='align-items-center'>
              <Link className='navbar-brand mb-5'><img src={logo} alt="logo" style={{ height: '36px', width: '36px', marginBottom: '20px'}} /></Link>
              <NavLink to="/dashboard" className="nav-link text-warning pb-2 pt-2">
                <span className="material-symbols-outlined">dashboard</span>
              </NavLink>
              <NavLink className="nav-link pb-2">
                <span className="material-symbols-outlined">analytics</span>
              </NavLink>
              <NavLink className="nav-link">
                <span className="material-symbols-outlined">settings</span>
              </NavLink>
              <NavLink onClick={props.logoutUser} className="nav-link pb-2" style={{ position: 'absolute', bottom: 0 }}>
                <span className="material-symbols-outlined">logout</span>
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
      <main className='container-fluid p-3' style={{ height: '100vh' }}>
        <h4>Dashboard</h4>
        <p>{currentDate}</p>
        <div className='row gx-2 pb-2 d-flex flex-wrap'>
          <div className='col-6'>
            <div className="card bg-dark p-3">
                <p className='text-center'>Battery Level</p>
                <Doughnut data={battery} options={doughnutOptions} />
                <h1 style={{ position: 'absolute', width: '100%', top: '80%', left: 0, textAlign: 'center', marginTop: '-28px',  lineHeight: '20px'}}>75%</h1>
            </div>
          </div>
          <div className='col-6'>
            <div className="card bg-dark p-3">
                <p className='text-center'>Power Consumption</p>
                <Doughnut data={power_consumption} options={doughnutOptions} />
                <h1 style={{ position: 'absolute', width: '100%', top: '80%', left: 0, textAlign: 'center', marginTop: '-28px',  lineHeight: '20px'}}>850w</h1>
            </div>
          </div>
        </div>
        <div className='row gx-2 d-flex flex-wrap'>
          <div className='col-4'>
            <div className="card bg-dark p-3">
                <p className='text-center'>Voltage</p>
                <Line data={voltage} options={voltage_options} />
            </div>
          </div>
          <div className='col-4'>
            <div className="card bg-dark p-3">
                <p className='text-center'>Current</p>
                <Line data={current} options={current_options} />
            </div>
          </div>
          <div className='col-4'>
            <div className="card bg-dark p-3">
                <p className='text-center'>Power</p>
                <Line data={power} options={power_options} />
            </div>
          </div>
        </div>
        <div className='row gx-2 pt-2 d-flex'>
          <div className='col-12'>
            <Weather weather={owner.weather} />
          </div>
        </div>
      </main>
    </div>
  )

}

export default Dashboard;