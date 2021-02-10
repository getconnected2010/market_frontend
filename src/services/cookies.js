import Cookies from 'universal-cookie';

const cookie = new Cookies()

export const assignCkie=async(data)=>{
    try {
        cookie.set('usertoken', data)
    } catch (error) {
        console.log(error)
    }
}

export const readCkie=async()=>{
    try {
        const usertoken = await cookie.get('usertoken')
        return usertoken
    } catch (error) {
        console.log(error)
        return null
    }
}