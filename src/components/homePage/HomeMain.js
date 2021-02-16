import React, {useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import HomeCarousel from './HomeCarousel';
import HomeCatagories from './HomeCatagories';
import HomeJumbotron from './HomeJumbotron';
import ModalComp from '../ModalComp';
import {aboutUs} from '../../assets/text'
import {getPicsApi} from '../../services/api/marketApi'
import {fetchListAction} from '../../actions/listActions'

import padlock from '../../assets/images/padlock.jpg'

const HomePage = () => {
    const dispatch = useDispatch()
    const listArr = useSelector(state=>state.list)
    const [showModal, setShowModal] = useState(false)
    const bgImg = useRef()
    
    console.log('list arr', listArr)
    const fetch =async()=>{
        const result = await getPicsApi()
        if(result&&result.status===200&&Array.isArray(result.data)){
            sessionStorage.setItem('listArr', JSON.stringify(result.data))
            dispatch(fetchListAction())
        }
    }
    if(!sessionStorage.getItem('listArr')){
        fetch()
    }
    const bgFn=()=>{
        bgImg.current.style.backgroundImage = `url('${padlock}')`;
    }
   
    return (
        <>
        <ModalComp showProp={showModal} setShowProp={setShowModal} title={aboutUs.title} body={aboutUs.body} />
        <div className='homePage' ref={bgImg} >
            <div className='homePage__first'>
                <HomeCarousel />

                <HomeJumbotron modalProp={setShowModal} />
            </div>
            <div className='homePage__catagories'>
                <button onClick={bgFn}>set background</button>
                <HomeCatagories />

            </div>
        </div>
    </>
    )
}

export default HomePage
