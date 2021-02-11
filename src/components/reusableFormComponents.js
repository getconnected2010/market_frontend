import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Fade from 'react-bootstrap/Fade'
import Collapse from 'react-bootstrap/Collapse'

export const ButtonComp =({label, ...rest})=>{
    return(
        <Button  {...rest} >{label}</Button>
    )
}

export const CheckboxComp =({label, refProp, ...rest})=>{
    return(
        <Form.Group >
            <Form.Check type="checkbox" label={label} ref={refProp} {...rest}/>
        </Form.Group>
    )
}

//wrap child components with CollapseComp so they fade in/out onClick
export const CollapseComp = ({openProp, children})=>{
    return(
        <Collapse in={openProp}>
            <div>
                {children}
            </div>
        </Collapse>
    )
}

//wrap child components with FadeComp so they fade in/out onClick
export const FadeComp = ({openProp, children})=>{
    return(
        <Fade in={openProp}>
            <div >
                {children}
            </div>
        </Fade>
    )
}

export const FormComp =({children, legend, ...rest})=>{
    return(
        <Form {...rest}>
            <legend><u>{legend}</u></legend>
            {children}
        </Form>
    )
}

export const InputComp =({label, errProp, name, refProp, ...rest})=>{
    return(
        <Form.Group >
            <Form.Label>{label}</Form.Label>
            <Form.Control name={name} {...rest} ref={refProp} />
            {errProp[name]&&<span className='error'>{errProp[name].message}</span>}
        </Form.Group>
    )
}

//wrap child elements with OverlayComp so that a atooltip can display 'message' on hover.
export const OverlayComp=({message, children})=>{
   
    return(
        <OverlayTrigger overlay={
                                <Tooltip >
                                {message}
                                </Tooltip>
                            }>
           <div>{children}</div> 
        </OverlayTrigger>
    )
}