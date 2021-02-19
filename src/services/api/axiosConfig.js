import axios from 'axios';
import {assignCkie, delCkie, readCkie} from '../cookies'

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
}, async(error)=>{
    if(error&&error.response&&error.response.status===401){
        delCkie()
        setTimeout(() => {
            window.location.href='/signin'
        }, 5000);
    }
    if(error){
        const user = await readCkie()
        if(!user|| user.user_id===null){
            setTimeout(() => {
                window.location.href='/signin'
            }, 5000);
            
        }
    }
    return Promise.reject(error)
}
)

axiosInstance.interceptors.request.use(async(req)=>{
    const usertoken = await readCkie()
    if(usertoken){
        req.headers.common['Authorization']= usertoken
    }
    return req
})