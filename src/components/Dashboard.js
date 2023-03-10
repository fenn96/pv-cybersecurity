import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, NavLink } from "react-router-dom"
import { setOwner } from '../reducers/ownerReducer'
import { CategoryScale, LinearScale, ArcElement, PointElement, LineElement, Filler, Chart } from "chart.js";
import { Line, Doughnut } from 'react-chartjs-2';
import ownerService from '../services/owner'

Chart.register(CategoryScale, LinearScale, ArcElement, PointElement, LineElement, Filler)

const Dashboard = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const owner = useSelector(state => state.owner);
  const currentDate = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  const navigate = useNavigate();

  useEffect(() => {
    const cookie = document.cookie
      .split(';')
      .find((c) => c.trim().startsWith('token='));

    if (!cookie) {
      navigate('/');
    } else {
      const token = cookie.split("=")[1];
      console.log(token)

      ownerService.getOwner({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        if (!data.authenticated) {
          navigate('/');
        } else {
          dispatch(setOwner({
            firstName: data.owner.firstName,
            lastName: data.owner.lastName,
            email: data.owner.email,
            id: data.owner.id,
            authenticated: data.authenticated,
            solarData: data.owner.solarPanels[0].solarData
          }));
          setIsLoading(false);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate('/');
        }
      });
    }
    
    const timer = setInterval(() => {
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
    return () => clearInterval(timer);
    
  },[])

  if (isLoading) {
    return (
      <div class='d-flex'>
        <div>
          <div>
            <div class="d-flex flex-column shadow-lg p-3 bg-dark min-vh-100">
              <nav class='align-items-center'>
                <NavLink to="/dashboard" className="nav-link pb-2 pt-2">
                  <span class="material-symbols-outlined">dashboard</span>
                </NavLink>
                <NavLink to="/analytics" className="nav-link pb-2">
                  <span class="material-symbols-outlined">analytics</span>
                </NavLink>
                <NavLink className="nav-link pb-2">
                  <span class="material-symbols-outlined">settings</span>
                </NavLink>
                <NavLink onClick={props.logoutUser} className="nav-link pb-2" style={{ position: 'absolute', bottom: 0 }}>
                  <span class="material-symbols-outlined">logout</span>
                </NavLink>
              </nav>
            </div>
          </div>
        </div>
        <main class='container-fluid pt-3' style={{ height: '100vh' }}>
          <h4>Dashboard</h4>
          <p>Loading...</p>
        </main>
      </div>
    )
  }

  // Filters solar data based on date
  const filteredData = owner.solarData.filter(data => new Date(data.time) >= (new Date(Date.now() - 10 * 60 * 1000)))

  const voltage = {
    labels: filteredData.map(data => new Date(data.time).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })),
    datasets: [
      {
        label: 'Voltage',
        data: filteredData.map(data => data.voltage),
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
    labels: filteredData.map(data => new Date(data.time).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })),
    datasets: [
      {
        label: 'Current',
        data: filteredData.map(data => data.current),
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
    labels: filteredData.map(data => new Date(data.time).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })),
    datasets: [
      {
        label: 'Power',
        data: filteredData.map(data => data.power),
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

  const options = {
    aspectRatio: 2.6,
    scales: {
      y:
        {
          grid: {
            color: 'rgb(47, 47, 47)'
          },
          min: 0,
          max: 100
        },
      x: {
          grid: {
            color: 'rgb(47, 47, 47)'
          },
          ticks: {
            maxTicksLimit: 5
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
    <div class='d-flex'>
      <div>
        <div>
          <div class="d-flex flex-column shadow-lg p-3 bg-dark min-vh-100">
            <nav class='align-items-center'>
              <NavLink to="/dashboard" className="nav-link pb-2 pt-2">
                <span class="material-symbols-outlined">dashboard</span>
              </NavLink>
              <NavLink to="/analytics" className="nav-link pb-2">
                <span class="material-symbols-outlined">analytics</span>
              </NavLink>
              <NavLink className="nav-link">
                <span class="material-symbols-outlined">settings</span>
              </NavLink>
              <NavLink onClick={props.logoutUser} className="nav-link pb-2" style={{ position: 'absolute', bottom: 0 }}>
                <span class="material-symbols-outlined">logout</span>
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
      <main class='container-fluid p-3' style={{ height: '100vh' }}>
        <h4>Dashboard</h4>
        <p>{currentDate}</p>
        <div class='row gx-2 pb-2 d-flex flex-wrap'>
          <div class='col-6'>
            <div class="card bg-dark p-3">
                <p class='text-center'>Battery Level</p>
                <Doughnut data={battery} options={doughnutOptions} />
                <h1 style={{ position: 'absolute', width: '100%', top: '80%', left: 0, textAlign: 'center', marginTop: '-28px',  lineHeight: '20px'}}>75%</h1>
            </div>
          </div>
          <div class='col-6'>
            <div class="card bg-dark p-3">
                <p class='text-center'>Power Consumption</p>
                <Doughnut data={power_consumption} options={doughnutOptions} />
                <h1 style={{ position: 'absolute', width: '100%', top: '80%', left: 0, textAlign: 'center', marginTop: '-28px',  lineHeight: '20px'}}>850w</h1>
            </div>
          </div>
        </div>
        <div class='row gx-2 d-flex flex-wrap'>
          <div class='col-4'>
            <div class="card bg-dark p-3">
                <p class='text-center'>Voltage</p>
                <Line data={voltage} options={options} />
            </div>
          </div>
          <div class='col-4'>
            <div class="card bg-dark p-3">
                <p class='text-center'>Current</p>
                <Line data={current} options={options} />
            </div>
          </div>
          <div class='col-4'>
            <div class="card bg-dark p-3">
                <p class='text-center'>Power</p>
                <Line data={power} options={options} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )

}

export default Dashboard;