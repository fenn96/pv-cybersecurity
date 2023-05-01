import axios from 'axios'
const baseUrl = '/api/solar/'

const getSolarData = async token => {
  const response = await axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

const getWeatherData = async credentials => {
  const response = await axios.put(baseUrl + "weather", credentials, {
    headers: {
      Authorization: `Bearer ${credentials.token}`
    }
  })
  return response.data
}

export default { getSolarData, getWeatherData }