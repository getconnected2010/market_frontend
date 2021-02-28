import React from 'react'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'

const EditPost = () => {
   const params = useParams()
   const listArr = useSelector(state=>state.list)
   console.log(listArr)
   const post_id = params.post_id
    return (
        <div>
            edit page
        </div>
    )
}

export default EditPost
