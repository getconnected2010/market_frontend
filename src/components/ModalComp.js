import React from 'react'
import Modal from 'react-bootstrap/Modal';

const ModalComp =({showProp, setShowProp, title, body})=>{
    return (
        <Modal  size="lg" show={showProp} onHide={() => setShowProp(false)}>
            <Modal.Header closeButton>
                <Modal.Title >
                   {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {body}
            </Modal.Body>
        </Modal>

    )
}

export default ModalComp
