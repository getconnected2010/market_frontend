import axios from 'axios';
import {assignCkie, readCkie} from '../cookies'

let url;
if(process.env.NODE_ENV==='production'){
    url='production url'
}else{
    url='http://localhost:8000'
}

export const axiosInstance = axios.create({
    baseURL: url
})

axiosInstance.interceptors.response.use(async(res)=>{
    if(res.headers.usertoken){
        await assignCkie(res.headers.usertoken)
    }
    return res
})

axiosInstance.interceptors.request.use(async(req)=>{
    const usertoken = await readCkie()
    if(usertoken){
        req.headers.common['Authorization']= usertoken
    }
    return req
})