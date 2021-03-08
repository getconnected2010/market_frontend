import React, {useState} from 'react'
import {useHistory, Link} from 'react-router-dom';
import {useForm} from 'react-hook-form'
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import {ButtonComp, FormComp, InputComp} from './reusableFormComponents'
import {changePassApi, resetPassApi, signupApi} from '../services/api/userApi';
import ModalComp from './ModalComp'

const SignUp = () => {
    const history = useHistory()
    const path = window.location.href
    const pathArr = path.split('/')
    const url = pathArr[pathArr.length-1]
    const [modalTtitle, setModalTitle] = useState('')
    const [showModal, setShowModal] = useState(false)
    const initValues = {username:'', password:'', confirm:'', pet:'', newPassword:''}
    const schema = Yup.object().shape({
        username: Yup.string().required('username is required')
    })
    const {register, handleSubmit, errors, reset} = useForm({
                                                    defaultValues: initValues,
                                                    mode:'onBlur',
                                                    resolver: yupResolver(schema)
                                                })
    const submitForm=async(values)=>{
        let result
        switch (url) {
            case 'signup':
               result = await signupApi(values) 
                break;
            case 'reset':
                result = await resetPassApi(values)
                break;
            case 'change':
                result = await changePassApi(values)
            default:
                break;
        }
        if(!result) {
            setModalTitle('Error submitting form. Please try again.')
            return setShowModal(true)
        }
        if(result.status===200){
            reset(initValues)
            alert('Success!!! You can now login using your new credentials.')
            history.push('/signin')
            return
        }
        if(result.response&&result.response.data&&result.response.data.msg){
            setModalTitle(result.response.data.msg)
            return setShowModal(true)
        }
        setModalTitle('Error submitting form. Please try again.')
        setShowModal(true)
    }
    return (
        <>
        <ModalComp setShowProp={setShowModal} showProp={showModal} title={modalTtitle} />
        <div className='signup'>
            <FormComp onSubmit={handleSubmit(submitForm)} legend={url==='signup'?'Sign Up':'Password service'}>
                <InputComp name='username' label='User name :' type='text' errProp={errors} refProp={register}/>
                <InputComp name='newPassword' label={url==='signup'? 'Password :':'New password :'} type='password' errProp={errors} refProp={register}/>
                <InputComp name='confirm' label='Confirm Password :' type='password' errProp={errors} refProp={register}/>
                {
                    url==='change' ?
                    <InputComp name='password' label='Your old password :' type='password' errProp={errors} refProp={register}/>
                    :
                    <InputComp name='pet' label='Your favourite pet name :' type='text' errProp={errors} refProp={register}/>
                }
                <a href='#' onClick={()=> reset(initValues)}>Clear form inputs?</a>
                {url==='signup'&&<span>Reset forgotten passwords <Link to='/reset'>here</Link>.</span>}
                <ButtonComp type='submit'>{url==='signup'?'Sign up':'Reset'}</ButtonComp>
            </FormComp>
        </div>
        </>
    )
}

export default SignUp