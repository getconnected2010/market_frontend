import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import ModalComp from '../components/ModalComp'
import {ButtonComp} from '../components/reusableFormComponents'
import {delPostApi} from '../services/api/marketApi'

const List = () => {
    const listArr = useSelector(state => state.list)
    const history = useHistory()
    let user_id
    const user = useSelector(state=> state.user)
    if(user) user_id= user.user_id
    const [showModal, setShowModal] = useState(false)
    const [modalPostId, setModalPostId] = useState('')
    const [modalTitle, setModalTitle] = useState('')
    const [modalBody, setModalBody] = useState('')
    const [modalPrice, setModalPrice] = useState('')
    const [modalContact, setModalContact] = useState('')
    const [modalPic, setModalPic] = useState([])

    const getDetails=async(e)=>{
        const detail = await listArr.filter(item=>item.post_id===Number(e.target.id))
        setModalPostId(detail[0].post_id)
        setModalTitle(detail[0].title)
        setModalBody(detail[0].description)
        setModalPrice(detail[0].price)
        setModalContact(detail[0].contact)
        setModalPic([detail[0].image1, detail[0].image2, detail[0].image3, detail[0].image4])
        setShowModal(true)
    }

    const deletePost = async(e)=>{
        const confirmDel= window.confirm('Are you sure you want to delete this post?')
        if(confirmDel===false) return
        const result = await delPostApi(e.target.id)
        setModalBody('')
        setModalPrice('')
        setModalContact('')
        setModalPic([])
        if(!result){
            setModalTitle('Eror deleting post. Please try again.')
            return setShowModal(true)
        }
        if(result.status===200){
            setModalTitle('Successfully deleted post.')
            setShowModal(true)
            const oldArr = JSON.parse(sessionStorage.getItem('listArr'))
            const newArr = oldArr.filter(item=>item.post_id!==Number(e.target.id))
            sessionStorage.setItem('listArr', JSON.stringify(newArr))
            return window.location.href='/list'
        }
        if(result.response&& result.response.data && result.response.data.msg){
            setModalTitle(result.response.data.msg)
            return setShowModal(true)
        }
        setModalTitle('Error deleting post. Please try again.')
        return setShowModal(true)
    }

    const editPost =async(e)=>{
        history.push(`/sell/${e.target.id}`)
    }
    return (
        <>
        <ModalComp showProp={showModal} setShowProp={setShowModal} postId={modalPostId} title={modalTitle} body={modalBody} price={modalPrice} contact={modalContact} picArr={modalPic}/>
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
                        {  
                            user_id===item.user_id &&
                            <>
                                <ButtonComp onClick={editPost} id={item.post_id}>Edit post</ButtonComp>
                                <ButtonComp onClick={deletePost} id={item.post_id}>Delete post</ButtonComp>
                            </>
                        }
                    </div>
                ))
            }
        </div>
        </>
    )
}

export default List
