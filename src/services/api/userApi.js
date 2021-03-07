import {axiosInstance} from './axiosConfig';

export const changePassApi= async(data)=>{
    try {
        const result = await axiosInstance.post('/user/change', data)
        return result
    } catch (error) {
        return error
    }
}

export const resetPassApi = async(data)=>{
    try {
        const result = await axiosInstance.post('/user/reset', data)
        return result
    } catch (error) {
        return error
    }
}

export const signInApi=async(data)=>{
    try {
        const result = await axiosInstance.post('user/signin', data)
        return result
    } catch (error) {
        return error
    }
}

export const signoutApi = async()=>{
    try {
        await axiosInstance.get('user/signout')
        return
    } catch (error) {
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