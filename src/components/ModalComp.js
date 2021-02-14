import React from 'react'
import Modal from 'react-bootstrap/Modal';

const ModalComp =({showProp, setShowProp, title, body, picArr})=>{
    return (
        <Modal className='modalComp'  size="lg" show={showProp} onHide={() => setShowProp(false)}>
            <Modal.Header closeButton>
                <Modal.Title >
                   {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='modalComp_img'>

                     {
                        picArr && picArr.map(pic=>(
                                        <img key={pic} src={pic} />
                                    ))
                    }
                </div>
                <div className='modalComp_body'>
                    {body}
                </div>
                
            </Modal.Body>
        </Modal>

    )
}

export default ModalComp
