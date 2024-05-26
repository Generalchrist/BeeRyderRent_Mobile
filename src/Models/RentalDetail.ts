import { CarImage } from "./CarImage";

export interface RentalDetail{
    id: number,
    brandName:string,
    customerId: number,
    customerName:string,
    model: string,
    rentDate:Date,
    returnDate:Date,
    images : CarImage[],
}