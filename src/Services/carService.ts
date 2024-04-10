import axiosInstance from './Helpers/axiosConfig';
import { CarDetail } from '../Models/CarDetail';

const endpoint = '/cars'; 

export const getAllCarDetails = async (): Promise<CarDetail[]> => {

  try {
    const response = await axiosInstance.get(endpoint + '/GetCarDetailsDto');
    return response.data.data as CarDetail[];
  } catch (error) {
    throw error;
  }
};
