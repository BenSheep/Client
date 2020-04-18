import axios from 'axios'

const api = axios.create({
  baseURL: 'http://116.203.64.13:4000/graphql',
})

export default api
