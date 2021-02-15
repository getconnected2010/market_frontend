export const fetchListAction=()=>async(dispatch)=>{
    try {
        const data = JSON.parse(sessionStorage.getItem('listArr'))
        dispatch({type: 'FETCH', payload: data})
    } catch (error) {
        console.log(error)
    } 
}