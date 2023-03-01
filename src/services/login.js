import axios from 'axios'
const baseUrl = 'http://solar-app.fly.dev:3003/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const logout = async credentials => {
  const response = await axios.post(baseUrl + '/logout')
  return response.data
}

export default { login, logout }