import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, NavLink } from "react-router-dom"
import { setOwner } from '../reducers/ownerReducer'
import { CategoryScale, LinearScale, ArcElement, PointElement, LineElement, Filler, Chart } from "chart.js";
import { Line } from 'react-chartjs-2';
import ownerService from '../services/owner'
import axios from 'axios';

Chart.register(CategoryScale, LinearScale, ArcElement, PointElement, LineElement, Filler)

const Dashboard = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const dispatch = useDispatch();
  const currentDate = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  const navigate = useNavigate();
  console.log(analytics)

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
            type: data.owner.type,
            solarData: data.owner.solarPanels[0].solarData
          }));
          if ( data.owner.type === "User") {
            navigate('/dashboard');
          }
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

    axios.get('http://localhost:5000/analyze_data')
      .then(response => {
        // Update the state with the response data
        setAnalytics(response.data.predictions);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
      });

    // Clear the timer when the component unmounts
    return () => clearInterval(timer);
    
  },[])

  if (isLoading) {
    return (
      <div className='d-flex'>
        <div>
          <div>
            <div className="d-flex flex-column shadow-lg p-3 bg-dark min-vh-100">
              <nav className='align-items-center'>
                <NavLink to="/admin" className="nav-link pb-2 pt-2">
                  <span className="material-symbols-outlined">dashboard</span>
                </NavLink>
                <NavLink to="/analytics" className="nav-link pb-2">
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
          <h4>Admin Dashboard</h4>
          <p>Loading...</p>
        </main>
      </div>
    )
  }


  const analysis = {
    labels: [1,2,3],
    datasets: [
      {
        label: 'Analysis',
        data: analytics[0],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        pointRadius: 0,
        fill: true,
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        tension: 0.5
      }
    ]
  }

  const options = {
    aspectRatio: 3.5,
    scales: {
      y:
        {
          grid: {
            color: 'rgb(47, 47, 47)'
          },
          min: 0,
          max: 1
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

  return (
    <div className='d-flex'>
      <div>
        <div>
          <div className="d-flex flex-column shadow-lg p-3 bg-dark min-vh-100">
            <nav className='align-items-center'>
              <NavLink to="/admin" className="nav-link pb-2 pt-2">
                <span className="material-symbols-outlined">dashboard</span>
              </NavLink>
              <NavLink to="/analytics" className="nav-link pb-2">
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
        <h4>Admin Dashboard</h4>
        <p>{currentDate}</p>
        <div className='row gx-2 d-flex flex-wrap'>
            <div className="card bg-dark p-3">
                <p className='text-center'>Analytics</p>
                <Line data={analysis} options={options} />
            </div>
        </div>
      </main>
    </div>
  )

}

export default Dashboard;