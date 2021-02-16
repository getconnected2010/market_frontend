import React from 'react'
import {useSelector} from 'react-redux'
import Carousel from 'react-bootstrap/Carousel';
import bank_volt from '../../assets/images/bank-volt.jpg'
import combo_lock from '../../assets/images/combo-lock.jpg'
import padlock from '../../assets/images/padlock.jpg'

const HomeCarousel = () => {
    const listArr = useSelector(state=>state.list)
    return (
        <Carousel>
           {
               Array.isArray(listArr)?
                    listArr.map((item, i)=>(
                        <Carousel.Item key={i} interval={500000}>
                            <img src={item.image1} />
                            {/* <Carousel.Caption>
                            <span>Today's highlights</span>
                            </Carousel.Caption> */}
                        </Carousel.Item>
                    ))
                    :
                    <Carousel.Item interval={1000}>
                        <img src={bank_volt} />
                        {/* <Carousel.Caption>
                        <span>Coming soon...</span>
                        </Carousel.Caption> */}
                    </Carousel.Item>

           }

        </Carousel>
    )
}

export default HomeCarousel


{/* <Carousel>
<Carousel.Item interval={500000}>
    <img src={bank_volt} />
    <Carousel.Caption>
    <span>First slide label</span>
    </Carousel.Caption>
</Carousel.Item>
<Carousel.Item interval={500000}>
    <img src={combo_lock} />
    <Carousel.Caption>
    <span>Second slide label bbbbbbbbbbbbbbbb </span>
    </Carousel.Caption>
</Carousel.Item>
<Carousel.Item interval={500000}>
    <img src={padlock} />
    <Carousel.Caption>
    <span>Third slide label</span>
    </Carousel.Caption>
</Carousel.Item>
</Carousel> */}
