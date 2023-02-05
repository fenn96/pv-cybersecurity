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

  const data = {
    labels: filteredData.map(data => new Date(data.time).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })),
    datasets: [
      {
        label: 'Voltage',
        data: filteredData.map(data => data.voltage),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        lineTension: 0.2
      },
      {
        label: 'Current',
        data: filteredData.map(data => data.current),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(13, 180, 185)',
        borderWidth: 1,
        lineTension: 0.2
      },
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
    <div>
      <h1>dashboard</h1>
      <nav>
        <NavLink to="/dashboard">
          Dashboard
        </NavLink>
        <NavLink to="/analytics">
          Analytics
        </NavLink>
        <NavLink onClick={props.logoutUser}>
          Log out
        </NavLink>
      </nav>
      <main>
        <p>{owner.firstName}</p>
        <p>{currentDate}</p>
        <Line data={data} />
      </main>
    </div>
  )

}

export default Dashboard;