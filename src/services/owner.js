import axios from 'axios'
const baseUrl = '/api/owner'

const signup = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const getOwner = async credentials => {
  const response = await axios.get(baseUrl, credentials)
  return response.data
}

export default { signup, getOwner }