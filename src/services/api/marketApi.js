import {axiosInstance} from './axiosConfig'

export const editPostApi = async(data)=>{
    try {
        let formData = new FormData()
        Object.keys(data).map(item=>{
            if(typeof(data[item])!=='object'){
                formData.append(item, data[item])
            }else{
               const picArr= Array.from(data[item])
               if(Array.isArray(picArr)){
                   picArr.map(pic=>{
                       formData.append('pics', pic)
                   })
               }
            }
        })
        const result = await axiosInstance.post('/market/update', formData)
        return result
    } catch (error) {
        return error
    }
}

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

export const myPostsApi= async()=>{
    try {
        const result = await axiosInstance.get('/market/myposts')
        return result
    } catch (error) {
        return error
    }
}

export const newPostApi=async(data)=>{
    try {
        const formData= new FormData()
        Object.keys(data).map(item=>{
            if(typeof(data[item])!=='object'){
                formData.append(item, data[item])
            }else{
                const picArr= Array.from(data[item])
                if(Array.isArray(picArr)){
                    picArr.map(pic=>{
                        formData.append('pics', pic)
                    })
                }
            }
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