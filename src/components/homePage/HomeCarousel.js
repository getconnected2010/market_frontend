import React from 'react'
import {useSelector} from 'react-redux'
import Carousel from 'react-bootstrap/Carousel';
import bank_volt from '../../assets/images/bank-volt.jpg'

const HomeCarousel = () => {
    const listArr = useSelector(state=>state.list)
    let picArr;
    if(Array.isArray(listArr)&&listArr.length>0){
        picArr = listArr.filter(item=> item.image1!==null)
    }
    return (
        <Carousel>
           {
               Array.isArray(picArr)?
                    picArr.map((item, i)=>(
                        <Carousel.Item key={i} interval={500000}>
                            <img src={item.image1} />
                        </Carousel.Item>
                    ))
                    :
                    <Carousel.Item interval={1000}>
                        <img src={bank_volt} />
                    </Carousel.Item>
           }
        </Carousel>
    )
}

export default HomeCarousel
