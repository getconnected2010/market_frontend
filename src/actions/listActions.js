export const fetchListAction=()=>async(dispatch)=>{
    try {
        const data = JSON.parse(sessionStorage.getItem('listArr'))
        if(!Array.isArray(data)) return
        dispatch({type: 'FETCH', payload: data})
    } catch (error) {
        console.log(error)
    } 
}