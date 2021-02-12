import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import {ButtonComp} from '../reusableFormComponents';
import {aboutUs} from '../../assets/text'


const HomeJumbotron = ({modalProp}) => {
    return (
        <Jumbotron fluid>
            <Container>
                <h1>Market</h1>
                <p>{aboutUs.highlight}</p>
                <p>
                    <ButtonComp label='Learn more' onClick={()=>modalProp(true)} />
                </p>
            </Container>
        </Jumbotron>
    )
}

export default HomeJumbotron
