import axios from 'axios';

let url;
if(process.env.NODE_ENV==='production'){
    url='production url'
}else{
    url='http://localhost:8000'
}

export const axiosInstance = axios.create({
    baseURL: url
})