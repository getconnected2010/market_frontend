export const fetchListAction=(data)=>async(dispatch)=>{
    try {
        dispatch({type: 'FETCH', payload: data})
    } catch (error) {
        console.log(error)
    }
    
}