import {axiosInstance} from './axiosConfig'

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
        console.log(result)
    } catch (error) {
        return error
    }
}