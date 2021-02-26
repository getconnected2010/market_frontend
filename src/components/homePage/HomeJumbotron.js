import React, {useState} from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import {ButtonComp} from '../reusableFormComponents';
import {aboutUs} from '../../services/text'
import ModalComp from '../ModalComp';


const HomeJumbotron = () => {
    const [showModal, setShowModal] = useState(false)
    return (
        <>
        <ModalComp showProp={showModal} setShowProp={setShowModal} title={aboutUs.title} body={aboutUs.body} />
        <Jumbotron fluid>
            <Container>
                <h1>Market</h1>
                <p>{aboutUs.highlight}</p>
                <p>
                    <ButtonComp onClick={()=>setShowModal(true)}>Learn more</ButtonComp>
                </p>
            </Container>
        </Jumbotron>
    </>
    )
}

export default HomeJumbotron
