import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import ListGroup from 'react-bootstrap/ListGroup';
import bank_volt from '../assets/images/bank-volt.jpg'
import combo_lock from '../assets/images/combo-lock.jpg'
import padlock from '../assets/images/padlock.jpg'
import {ButtonComp} from '../components/reusableFormComponents';
import ModalComp from '../components/ModalComp';
import {aboutUs} from '../assets/text'

const HomePage = () => {
    const [showModal, setShowModal] = useState(false)
    const catagories =['auto', 'household', 'electronics', 'fashion', 'housing', 'pesonal care', 'for hire', 'everything else']
    return (
        <>
        <ModalComp showProp={showModal} setShowProp={setShowModal} title={aboutUs.title} body={aboutUs.body} />
        <div className='homePage'>
            <Carousel>
                <Carousel.Item interval={5000}>
                    <img src={bank_volt} />
                    <Carousel.Caption>
                    <span>First slide label</span>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={5000}>
                    <img src={combo_lock} />
                    <Carousel.Caption>
                    <span>Second slide label bbbbbbbbbbbbbbbb </span>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={5000}>
                    <img src={padlock} />
                    <Carousel.Caption>
                    <span>Third slide label</span>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <Jumbotron fluid>
                <Container>
                    <h1>Market</h1>
                    <p>{aboutUs.highlight}</p>
                    <p>
                        <ButtonComp label='Learn more' onClick={()=>setShowModal(true)} />
                    </p>
                </Container>
            </Jumbotron>
            <div className='homePage__catagories'>
            <Accordion className='container'>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        <Link to='#'><h2>Catagories</h2></Link>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <ListGroup variant="flush">
                                    {
                                        catagories.map(item=>(
                                            <ListGroup.Item action key={item}><Link to='#'>{item}</Link></ListGroup.Item>
                                        ))
                                    }
                            </ListGroup>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            </div>
        </div>
    </>
    )
}

export default HomePage
