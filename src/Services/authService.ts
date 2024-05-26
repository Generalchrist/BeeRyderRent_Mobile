import { Claims } from '../Models/Claims';
import { RegisterModel } from '../Models/RegisterModel';
import { UserModel } from '../Models/userModel';
import { LoginModel } from './../Models/loginModel';
import axiosInstance from './Helpers/axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode as atob } from 'base-64';

export const loginUser = async (loginModel: LoginModel): Promise<any> => {
  try {
    const response = await axiosInstance.post('/auth/login', loginModel).then((response) => {
      const token = response.data.data.token;
      const claims = parseToken(token);
      AsyncStorage.setItem('token', token);
      return claims;
    }).catch((error) => {
      console.error(error)
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (registerModel: RegisterModel): Promise<any> => {
  try {
    const response = await axiosInstance.post('/auth/register', registerModel);
    const token = response.data.token;
    const claims = parseToken(token);
    await AsyncStorage.setItem('token', token);
    return claims; // Return the claims to use them as needed
  } catch (error) {
    throw error;
  }
};

export const getUser = async (_id: number): Promise<UserModel> => {
  try {
    const response = await axiosInstance.get('/user/getuser', { params: { id: _id } });
    return response.data as UserModel;
  } catch (error) {
    throw error;
  }
};

export const parseToken = (token: string): Claims | null => {
  const tokenAttributes = getTokenAttributes(token);
  if (tokenAttributes) {
    const claims: Claims = {
      userId: parseInt(tokenAttributes["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]),
      email: tokenAttributes["email"],
      fullName: tokenAttributes["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
      roles: tokenAttributes["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    };
    return claims;
  }
  return null;
};

const getTokenAttributes = (token: string): any => {
  if (token) {
    const tokenData = token.split('.')[1];
    const decodedTokenData = atob(tokenData);
    const tokenJson = decodeURIComponent(decodedTokenData.split('').map(c =>
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join(''));

    return JSON.parse(tokenJson);
  }
  return null;
};
