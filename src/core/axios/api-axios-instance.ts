import axios from 'axios'
import 'lib/bigint-polyfill'

const API_ROUTE = '/api'

const APIAxiosInstance = axios.create({ baseURL: API_ROUTE })

APIAxiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  (error) => {
    return Promise.reject(error?.response?.data)
  },
)

export { APIAxiosInstance }
