import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, NavLink } from "react-router-dom"
import { setOwner } from '../reducers/ownerReducer'
import { CategoryScale, LinearScale, PointElement, LineElement, Filler, Chart } from "chart.js";
import { Line } from 'react-chartjs-2';
import ownerService from '../services/owner'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Filler)

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
    
  },[])

  if (isLoading) {
    return <div>Loading...</div>
  }

  // Filters solar data based on date
  const filteredData = owner.solarData.filter(data => new Date(data.time).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) === currentDate)

  const voltage = {
    labels: filteredData.map(data => new Date(data.time).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })),
    datasets: [
      {
        label: 'Voltage',
        data: filteredData.map(data => data.voltage),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  }

  const current = {
    labels: filteredData.map(data => new Date(data.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })),
    datasets: [
      {
        label: 'Current',
        data: filteredData.map(data => data.current),
        backgroundColor: 'rgba(13, 180, 185, 0.2)',
        fill: true,
        borderColor: 'rgba(13, 180, 185)',
        borderWidth: 1
      }
    ]
  }

  const power = {
    labels: filteredData.map(data => new Date(data.time).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })),
    datasets: [
      {
        label: 'Power',
        data: filteredData.map(data => data.power),
        backgroundColor: 'rgba(178, 222, 39, 0.2)',
        fill: true,
        borderColor: 'rgba(178, 222, 39)',
        borderWidth: 1
      }
    ]
  }

  const options = {
    scales: {
      yAxes: [
        {
          gridLines: {
            color: "red"
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            color: "blue"
          }
        }
      ]
    }
  };

  return (
    <div class='d-flex'>
      <div>
        <div>
          <div class="d-flex flex-column p-3 bg-dark min-vh-100">
            <nav class='align-items-center'>
              <NavLink to="/dashboard" className="nav-link">
                <span class="material-symbols-outlined">dashboard</span>
              </NavLink>
              <NavLink to="/analytics" className="nav-link">
                <span class="material-symbols-outlined">analytics</span>
              </NavLink>
              <NavLink onClick={props.logoutUser} className="nav-link" style={{ position: 'absolute', bottom: 0 }}>
                <span class="material-symbols-outlined">logout</span>
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
      <main class='container-fluid pt-3' style={{ height: '100vh' }}>
        <h4>Dashboard</h4>
        <p>{currentDate}</p>
        <div class='d-flex flex-wrap'>
            <div class="card card-shadow bg-dark col-4 shadow-lg p-3" style={{ height: '250px' }}>
                <p class='text-center'>Voltage</p>
                <Line data={voltage} height={250} options={{maintainAspectRatio: false}} />
            </div>
            <div class="card bg-dark col-4 shadow-lg p-3" style={{ height: '250px' }}>
                <p class='text-center'>Current</p>
                <Line data={current} height={250} options={{maintainAspectRatio: false}} />
            </div>
            <div class="card bg-dark col-4 shadow-lg p-3" style={{ height: '250px' }}>
                <p class='text-center'>Power</p>
                <Line data={power} height={250} options={{maintainAspectRatio: false}} />
            </div>
        </div>
      </main>
    </div>
  )

}

export default Dashboard;