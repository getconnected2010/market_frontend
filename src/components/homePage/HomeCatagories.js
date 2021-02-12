import React from 'react'
import {Link} from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


const HomeCatagories = () => {
    const catagories =['auto', 'household', 'electronics', 'fashion', 'housing', 'pesonal care', 'for hire', 'everything else']
    return (
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
    )
}

export default HomeCatagories
