import axios from 'axios'
const baseUrl = 'https://solar-backend.herokuapp.com//api/owner/'

const signup = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const getOwner = async token => {
  const response = await axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export default { signup, getOwner }