import {axiosInstance} from './axiosConfig'

export const emailSellerApi= async(data)=>{
    try {
        const result = await axiosInstance.post('/market/message', data)
        return result
    } catch (error) {
        return error
    }
}

export const getListApi= async(data)=>{
    try {
        const result = await axiosInstance.get(`/market/list/${data}`)
        return result
    } catch (error) {
        return error
    }
}

export const newPostApi=async(data)=>{
    try {
        const formData= new FormData()
        if(data.pics){
            const pics=Array.from(data.pics)
            pics.map(pic=>{
                formData.append('pics', pic)
            })
        }
        Object.keys(data).map(key=>{
            formData.append(key, data[key])
        })
        const result = await axiosInstance.post('/market/post', formData)
        return result
    } catch (error) {
        return error
    }
}

export const searchApi= async(data)=>{
    try {
        const result = await axiosInstance.get(`/market/search/${data}`)
        return result
    } catch (error) {
        return error
    }
}