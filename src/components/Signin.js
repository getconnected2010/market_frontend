import React, {useState} from 'react'
import {useHistory, Link} from 'react-router-dom'
import {useDispatch} from 'react-redux';
import {useForm} from 'react-hook-form';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import {ButtonComp,FormComp, InputComp} from '../components/reusableFormComponents'
import {signInApi} from '../services/api/userApi'
import {signinAction, signoutAction} from '../actions/userActions'
import ModalComp from './ModalComp'

const Signin = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [showModal, setShowModal] = useState(false)
    const [modalTtitle, setModalTitle] = useState('')
    const initValues={username:'', password:''}
    const schema = Yup.object().shape({
        username: Yup.string(),
        password: Yup.string()
    })

    const {register, handleSubmit, errors, reset} = useForm({
                                                        defaultValues: initValues,
                                                        resolver: yupResolver(schema),
                                                        mode:'onBlur'
                                                    })
    const submitForm= async(values)=>{
        const result = await signInApi(values)
        if(result.status===200){
            dispatch(signinAction())
            return history.push('/')
        }
        reset(initValues)
        dispatch(signoutAction())
        if(result.response&&result.response.data&&result.response.data.msg){
            setModalTitle(result.response.data.msg)
            return setShowModal(true)
        }
        setModalTitle('error logging you in')
        setShowModal(true)
    }
    return (
        <>
            <ModalComp showProp={showModal} setShowProp={setShowModal} title={modalTtitle} />
            <div className='signin'>
                <FormComp onSubmit={handleSubmit(submitForm)} legend='Sign in'>
                    <InputComp label='User name :' name='username' type='text' errProp={errors} refProp={register} />
                    <InputComp label='Password :' name='password' type='password' errProp={errors} refProp={register} />
                    <span>Forgot password? Reset it <Link to='/reset'>here</Link>.</span>
                    <ButtonComp type='submit'>Sign in</ButtonComp>
                </FormComp>
            </div>
        </>
    )
}

export default Signin
