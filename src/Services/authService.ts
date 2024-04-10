import axiosInstance from './Helpers/axiosConfig';

export const loginUser = async (username: string, password: string): Promise<any> => {
  try {
    const response = await axiosInstance.post('/login', { username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};