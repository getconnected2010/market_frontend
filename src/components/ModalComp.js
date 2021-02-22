import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal';

const ModalComp =({showProp, setShowProp, title, body, price, picArr})=>{
    const [picZoom, setPicZoom] = useState(false)
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
                            price?`Price: $${price}`:null
                        }
                </div>
                <div className='modalComp__img'>
                     {
                        picArr && picArr.map(pic=>(
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
