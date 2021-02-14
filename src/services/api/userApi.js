import {axiosInstance} from './axiosConfig';
import {readCkie, delCkie} from '../cookies'

export const signInApi=async(data)=>{
    try {
        const result = await axiosInstance.post('user/signin', data)
        return result
    } catch (error) {
        console.log(error.response)
        return error
    }
}

export const signoutApi = async()=>{
    try {
        await axiosInstance.get('user/signout')
        return
    } catch (error) {
        console.log(error.response)
        return
    }
}

export const signupApi=async (data)=>{
    try {
        const result = await axiosInstance.post('user/signup', data)
        return result
    } catch (error) {
        return error
    }
   
}