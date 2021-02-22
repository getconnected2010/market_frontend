import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import HomeCarousel from './HomeCarousel';
import HomeJumbotron from './HomeJumbotron';
import ModalComp from '../ModalComp';
import {getListApi} from '../../services/api/marketApi'
import {fetchListAction} from '../../actions/listActions'

import padlock from '../../assets/images/padlock.jpg'

const HomePage = () => {
    const dispatch = useDispatch()
    const listArr = useSelector(state=>state.list)
    const [showModal, setShowModal] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    const [modalBody, setModalBody] = useState('')
    const [modalPrice, setModalPrice] = useState('')
    const [modalPic, setModalPic] = useState([])
    
    const getDetails=(e)=>{
        const selectedItem= listArr.filter(item=>item.post_id===Number(e.target.id))
        setModalTitle(selectedItem[0].title)
        setModalBody(selectedItem[0].description)
        setModalPrice(selectedItem[0].price)
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
            <ModalComp showProp={showModal} setShowProp={setShowModal} title={modalTitle} body={modalBody} price={modalPrice} picArr={modalPic}/>
            <div className='homePage'>
                <HomeCarousel />
                <HomeJumbotron modalProp={setShowModal} />

                <div className='homePage__pic-preview'>
                    {
                        Array.isArray(listArr)
                        && 
                        listArr.map(pic=>(
                            <div id={pic.post_id} key={pic.image1} className='image'>
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
                        Array.isArray(listArr)
                        &&
                        listArr.map(item=>(
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
