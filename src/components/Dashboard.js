import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, NavLink } from "react-router-dom"
import { setOwner } from '../reducers/ownerReducer'
import { CategoryScale, LinearScale, PointElement, LineElement, Chart } from "chart.js";
import { Line } from 'react-chartjs-2';
import ownerService from '../services/owner'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement)

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
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        lineTension: 0.2
      }
    ]
  }

  const current = {
    labels: filteredData.map(data => new Date(data.time).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })),
    datasets: [
      {
        label: 'Current',
        data: filteredData.map(data => data.current),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(13, 180, 185)',
        borderWidth: 1,
        lineTension: 0.2
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
        borderColor: 'rgba(178, 222, 39)',
        borderWidth: 1,
        lineTension: 0.2
      }
    ]
  }

  return (
    <div class='container-fluid d-flex flex-column flex-md-row'>
      <div class="sidebar-container">
        <div class="sidebar">
          <div class="d-flex flex-column align-items-center px-3 pt-2 text-white min-vh-100">
            <nav class='nav nav-pills flex-column mb-md-auto mb-0 align-items-center'>
              <NavLink to="/dashboard" className="nav-link">
                <span class="material-symbols-outlined">dashboard</span>
              </NavLink>
              <NavLink to="/analytics" className="nav-link">
                <span class="material-symbols-outlined">analytics</span>
              </NavLink>
              <NavLink onClick={props.logoutUser} style={{ position: 'absolute', bottom: 0 }}>
                <span class="material-symbols-outlined">logout</span>
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
      <main class='flex-grow-1' style={{ paddingLeft: '80px' }}>
        <p>{owner.firstName}</p>
        <p>{currentDate}</p>
        <div class="d-flex row mt-4">
            <div class="card col-3 border border-white shadow mx-auto">
                <p>Voltage</p>
                <Line data={voltage} />
            </div>
            <div class="card col-3 border border-white shadow mx-auto">
                <p>Current</p>
                <Line data={current} />
            </div>
            <div class="card col-3 border border-white shadow mx-auto">
                <p>Power</p>
                <Line data={power} />
            </div>
        </div>
      </main>
    </div>
  )

}

export default Dashboard;