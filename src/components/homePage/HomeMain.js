import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import HomeCarousel from './HomeCarousel';
import HomeJumbotron from './HomeJumbotron';
import ModalComp from '../ModalComp';
import {getListApi} from '../../services/api/marketApi'
import {fetchListAction} from '../../actions/listActions'

const HomePage = () => {
    const dispatch = useDispatch()
    const listArr = useSelector(state=>state.list)
    const tenItemsArr = listArr.slice(0, 10)
    const [showModal, setShowModal] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    const [modalPostId, setModalPostId] = useState('')
    const [modalBody, setModalBody] = useState('')
    const [modalPrice, setModalPrice] = useState('')
    const [modalContact, setModalContact] = useState('')
    const [modalPic, setModalPic] = useState([])
    
    const getDetails=(e)=>{
        const selectedItem= tenItemsArr.filter(item=>item.post_id===Number(e.target.id))
        setModalPostId(selectedItem[0].post_id)
        setModalTitle(selectedItem[0].title)
        setModalPrice(selectedItem[0].price)
        setModalContact(selectedItem[0].contact)
        setModalBody(selectedItem[0].description)
        setModalPic([selectedItem[0].image1, selectedItem[0].image2, selectedItem[0].image3, selectedItem[0].image4])
        setShowModal(true)
    }
    
    const fetch =async()=>{
        const result = await getListApi()
        if(result&&result.status===200&&Array.isArray(result.data)){
            sessionStorage.setItem('listArr', JSON.stringify(result.data))
            dispatch(fetchListAction())
        }
    }
    //checks session storage for listArr presense or if its length is zero. Then calls Api to fetch list.
    if(!sessionStorage.getItem('listArr')|| JSON.parse(sessionStorage.getItem('listArr')).length===0){
        fetch()
    }
   
    return (
        <>
            <ModalComp showProp={showModal} setShowProp={setShowModal} postId={modalPostId} title={modalTitle} price={modalPrice} contact={modalContact}  body={modalBody} picArr={modalPic}/>
            <div className='homePage'>
                <HomeCarousel />
                <HomeJumbotron modalProp={setShowModal} />

                <div className='homePage__pic-preview'>
                    {
                        Array.isArray(tenItemsArr)
                        && 
                        tenItemsArr.map((pic, i)=>(
                            <div id={pic.post_id} key={i} className='image'>
                                {
                                    pic.price
                                    ?
                                    <div id={pic.post_id} className='price'>
                                        {`$${pic.price}`}
                                    </div>
                                    :
                                    null
                                }
                                
                                <img src={pic.image1} alt='posting pic' id={pic.post_id} onClick={getDetails} />
                            </div>
                        ))
                    }
                </div>
                <div className='homePage__title-preview'>
                <h4>Today's highlights...</h4>
                    <ul >
                    {
                        Array.isArray(tenItemsArr)
                        &&
                        tenItemsArr.map(item=>(
                            <Link to='#' key={item.post_id} id={item.post_id} onClick={getDetails}>
                                <li id={item.post_id} onClick={getDetails}>
                                {item.price&& `$${item.price}. . .`} {item.title}
                                </li>
                            </Link>
                        ))
                    }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default HomePage
