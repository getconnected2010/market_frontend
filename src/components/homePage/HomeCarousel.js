import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import bank_volt from '../../assets/images/bank-volt.jpg'
import combo_lock from '../../assets/images/combo-lock.jpg'
import padlock from '../../assets/images/padlock.jpg'

const HomeCarousel = () => {
    return (
        <Carousel>
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
        </Carousel>
    )
}

export default HomeCarousel
