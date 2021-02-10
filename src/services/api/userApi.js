import {axiosInstance} from './axiosConfig';

export const signInApi=async(data)=>{
    try {
        const result = await axiosInstance.post('user/signin', data)
        return result
    } catch (error) {
        return error
    }
}

export const signupApi=async (data)=>{
    try {
        const result = await axiosInstance.post('user/signup', data)
        return result
    } catch (error) {
        console.log(error)
        return error
    }
   
}