import React from 'react'
import {Link, useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import {fetchListApi} from '../../services/api/marketApi'
import {fetchListAction} from '../../actions/listActions'

const HomeCatagories = () => {
    const catagories =['auto', 'household', 'electronics', 'fashion', 'housing', 'pesonal care', 'for hire', 'everything else']
    const dispatch =  useDispatch()
    const history = useHistory()
    // window.onload = ()=>{
    //     window.addEventListener('resize',()=>{
    //         if(window.innerWidth>1200){
    //             document.getElementById('catagory').click()
    //         }
    //     })
    // }
    const fetchList=async(e)=>{
        const result = await fetchListApi(e.target.id)
        dispatch(fetchListAction(result.data))
        history.push('/list')
    }
    return (
        <Accordion className='container' >
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                    <Link to='#'><h2 id='catagory'>Catagories</h2></Link>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <ListGroup  variant="flush">
                                {
                                    catagories.map(item=>(
                                        <ListGroup.Item key={item} action><Link id={item} onClick={fetchList} to='#'>{item}</Link></ListGroup.Item>
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
