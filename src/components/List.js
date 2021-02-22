import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import ModalComp from '../components/ModalComp'

const List = () => {
    const listArr = useSelector(state => state.list)
    const [showModal, setShowModal] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    const [modalBody, setModalBody] = useState('')
    const [modalPrice, setModalPrice] = useState('')
    const [modalPic, setModalPic] = useState([])

    const getDetails=async(e)=>{
        const detail = await listArr.filter(item=>item.post_id===Number(e.target.id))
        setModalTitle(detail[0].title)
        setModalBody(detail[0].description)
        setModalPrice(detail[0].price)
        setModalPic([detail[0].image1, detail[0].image2, detail[0].image3, detail[0].image4])
        setShowModal(true)
    }
    return (
        <>
        <ModalComp showProp={showModal} setShowProp={setShowModal} title={modalTitle} body={modalBody} price={modalPrice} picArr={modalPic}/>
        <div className='list'>
            {
                Array.isArray(listArr)  //prevents components failure incase listArr isn't iterable
                &&
                listArr.map(item=>(
                    <div className='list__card' id={item.post_id} key={item.post_id}>
                        <Link id={item.post_id} to='#' onClick={getDetails}>
                            <div className='list__img' id={item.post_id}>
                                <img src={item.image1} alt='first image' id={item.post_id}/>
                            </div>

                            <div id={item.post_id} className='list__title'>
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
