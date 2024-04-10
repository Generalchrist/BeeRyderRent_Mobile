import axios, { AxiosInstance } from 'axios';

// Create an Axios instance with custom configuration
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://10.0.2.2:5000/api', // Set your base URL here
  timeout: 10000, // Adjust the timeout as needed
});

// Disable SSL verification for all requests
axiosInstance.defaults.httpsAgent = {
  rejectUnauthorized: false,
};

export default axiosInstance;
