import {axiosInstance} from './axiosConfig';

export const signupApi=async (data)=>{
    try {
        const result = await axiosInstance.post('user/signup', data)
        return result
    } catch (error) {
        console.log(error)
        return error
    }
   
}