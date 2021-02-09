import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export const ButtonComp =({label, onClickProp, ...rest})=>{
    return(
        <Button  {...rest} >{label}</Button>
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