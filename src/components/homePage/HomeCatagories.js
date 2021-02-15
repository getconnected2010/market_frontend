import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ModalComp from '../ModalComp';
import {listCatagoryApi} from '../../services/api/marketApi'
import {fetchListAction} from '../../actions/listActions'

const HomeCatagories = () => {
    const catagories =['auto', 'household', 'electronics', 'fashion', 'housing', 'pesonal care', 'for hire', 'everything else']
    const dispatch =  useDispatch()
    const history = useHistory()
    const [showModal, setShowModal] = useState(false)
    const [modalTitle, setModalTitle]= useState('')
    const fetchList=async(e)=>{
        const result = await listCatagoryApi(e.target.id)
        if(result&&result.status===200&&result.data){
            if(result.data.length>0){
                sessionStorage.setItem('listArr', JSON.stringify(result.data))
                dispatch(fetchListAction())
                history.push('/list')
                return
            }else{
                setModalTitle('No items in that caragory. Please make anohter selection')
                setShowModal(true)
            }
        } else if(result&&result.response&&result.response.data&&result.response.data.msg){
            setModalTitle(result.response.data.msg)
            setShowModal(true)
        }else{
            setModalTitle('Error fetching items in that catagory. Please try again.')
            setShowModal(true)
        }
    }
    return (
        <>
            <ModalComp title={modalTitle} showProp={showModal} setShowProp={setShowModal} />
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
        </>
    )
}

export default HomeCatagories
