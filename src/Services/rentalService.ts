import { Rental } from '../Models/Rental';
import { RentalDetail } from '../Models/RentalDetail';
import axiosInstance from './Helpers/axiosConfig';

const endpoint = '/Rentals';

export const getAllCarDetailsByUserId = async (userId: number): Promise<RentalDetail[]> => {
    try {
        const response = await axiosInstance.get(endpoint + '/getrentaldetaildtobyuserid', { params: { userid: userId } });
        return response.data.data as RentalDetail[];
    } catch (error) {
        throw error;
    }
};

export const postRental = async (rental: Rental): Promise<any> => {
    try {
        const response = await axiosInstance.post(endpoint + '/add', {rental : rental, creditCard : null});
        return response.data;
    } catch (error) {
        throw error;
    }
}
