import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { object } from 'yup'
import ModalComp from '../components/ModalComp'

const List = () => {
    const listArr = useSelector(state => state.list)
    const [showModal, setShowModal] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    const [modalBody, setModalBody] = useState('')
    const [modalPic, setModalPic] = useState([])

    const getDetails=async(e)=>{
        const detail = await listArr.filter(item=>item.post_id===Number(e.target.id))
        setModalTitle(detail[0].title)
        setModalBody(detail[0].description)
        setShowModal(true)
        setModalPic([detail[0].image1, detail[0].image2, detail[0].image3, detail[0].image4])
    }
    return (
        <>
        <ModalComp showProp={showModal} setShowProp={setShowModal} title={modalTitle} body={modalBody} picArr={modalPic}/>
        <div className='list'>
            {
                listArr.map(item=>(
                    <div className='list_card' key={item.post_id}>
                        <Link id={item.post_id} to='#' onClick={getDetails}>
                            <div className='list_img'>
                                <img src={item.image1} alt='first image' id={item.post_id}/>
                            </div>

                            <div id={item.post_id} className='list_title'>
                                {item.title}
                            </div>
                        </Link>
                    </div>
                ))
            }
        </div>
        </>
    )
}

export default List
