import React, {useState} from 'react';
import HomeCarousel from './HomeCarousel';
import HomeCatagories from './HomeCatagories';
import HomeJumbotron from './HomeJumbotron';
import ModalComp from '../ModalComp';
import {aboutUs} from '../../assets/text'
import {getPicsApi} from '../../services/api/marketApi'

const HomePage = () => {
    const [showModal, setShowModal] = useState(false)
    const fetch =async()=>{
        const result = await getPicsApi()
        console.log(result)
    }
    if(!sessionStorage.getItem('listArr')){
        fetch()
    }
    return (
        <>
        <ModalComp showProp={showModal} setShowProp={setShowModal} title={aboutUs.title} body={aboutUs.body} />
        <div className='homePage'>
            <div className='homePage__first'>
                <HomeCarousel />

                <HomeJumbotron modalProp={setShowModal} />
            </div>
            <div className='homePage__catagories'>
                <HomeCatagories />

            </div>
        </div>
    </>
    )
}

export default HomePage
