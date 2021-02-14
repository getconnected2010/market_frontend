import jwtDecode from 'jwt-decode';
import {delCkie, readCkie} from '../services/cookies'

export const signinAction=(data)=>async(dispatch)=>{
    try {
        const user = await readCkie()
        if(user){
            const{user_id, admin} = jwtDecode(user)
            dispatch({type:'SIGNIN', payload: {user_id, admin}})
        }else{
            delCkie()
            dispatch({type:'SIGNOUT'})
        }
    } catch (error) {
        delCkie()
        dispatch({type:'SIGNOUT'})
    }
}

export const signoutAction=()=>async(dispatch)=>{
    try {
        delCkie()
        dispatch({type:'SIGNOUT'})
    } catch (error) {
        delCkie()
        dispatch({type:'SIGNOUT'})
    }
}