import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import {messageToSeller} from '../services/text'
import {emailSellerApi} from '../services/api/marketApi'

const ModalComp =({postId, body, contact, picArr, price, setShowProp, showProp, title})=>{
    const [picZoom, setPicZoom] = useState(false) //pic enlarges onclick
    const contactFn=async(e)=>{
        const message = prompt(messageToSeller.inputPrompt)
        if(message){
            if(message.length>200) return alert(messageToSeller.lengthLimitations)
            if(!message.match(/^[ a-zA-Z0-9!@$?()_+=.]+$/)) return alert(messageToSeller.crLimitations)

            const result = await emailSellerApi({message: message, post_id: e.target.id})
            if(!result) return alert("Error contacting seller. Please try again.")
            if(result.status===200) return alert('message successfully sent to seller')
            if(result.response&&result.response.data&&result.response.data.msg) return alert(result.response.data.msg)
            alert("Error contacting seller. Please try again.")
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
