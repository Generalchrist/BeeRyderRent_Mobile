import axios, { AxiosInstance } from 'axios';

export const MACHINE_URL = 'http://192.168.1.132:5000';
export const API_URL = MACHINE_URL + '/api/';

// Create an Axios instance with custom configuration
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL, // Set your base URL here
  timeout: 10000, // Adjust the timeout as needed
});

// Disable SSL verification for all requests
axiosInstance.defaults.httpsAgent = {
  rejectUnauthorized: false,
};

export default axiosInstance;
