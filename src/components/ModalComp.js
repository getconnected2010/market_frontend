import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

const ModalComp =({postId, body, contact, picArr, price, setShowProp, showProp, title})=>{
    const [picZoom, setPicZoom] = useState(false) //pic enlarges onclick
    const contactFn=(e)=>{
        const message = prompt("Please enter your message in 200 characters or less. Only '!@$()_+=.' special characters allowed.")
        if(message){
            if(message.length>200) return alert('Maximum 200 characters allowed in message. Please try again.')
            if(!message.match(/^[ a-zA-Z0-9!@$()_+=.]+$/)) return alert("Only '!@$()_+=.' special characters allowed. Please try again.")
            console.log('message', message)
            console.log('post-id', e.target.id)
        }
    }
    const zoomFunc=(e)=>{
        if(picZoom===e.target.id){
            setPicZoom('')
        }else{
            setPicZoom(e.target.id)
        }
    }
    return (
        <Modal className='modalComp'  size="lg" show={showProp} onHide={() =>{setPicZoom(''); setShowProp(false)}}>
            <Modal.Header closeButton>
                <Modal.Title >
                   {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='modalComp__price'>
                        {
                            price && `Price: $${price}`
                        }
                </div>
                <div className='modalComp__contact'>
                        {
                            contact==='true' && <Link id={postId} onClick={contactFn} to='#'>Email seller</Link>
                        }
                </div>
                <div className='modalComp__img'>
                     {
                        picArr && Array.isArray(picArr) && picArr.map(pic=>(
                                pic && <img key={pic} id={pic} src={pic} className={picZoom===pic?'zoom':''} onClick={zoomFunc} />
                                ))
                    }
                </div>
                <div className='modalComp__body'>
                    {body}
                </div>
            </Modal.Body>
        </Modal>

    )
}

export default ModalComp
