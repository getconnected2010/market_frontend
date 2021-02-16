import React from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux';
import {useForm} from 'react-hook-form';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import {ButtonComp,FormComp, InputComp} from '../components/reusableFormComponents'
import {signInApi} from '../services/api/userApi'
import {signinAction, signoutAction} from '../actions/userActions'

const Signin = () => {
    const dispatch = useDispatch()
    const history = useHistory()
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
            return alert(result.response.data.msg)
        }
        alert('error logging you in')
    }
    return (
        <div className='signin'>
            <FormComp onSubmit={handleSubmit(submitForm)} legend='Sign in'>
                <InputComp label='User name :' name='username' type='text' errProp={errors} refProp={register} />
                <InputComp label='Password :' name='password' type='password' errProp={errors} refProp={register} />
                <a href='#' onClick={()=>reset(initValues)}>reset form?</a>
                <ButtonComp type='submit'>Sign in</ButtonComp>
            </FormComp>
        </div>
    )
}

export default Signin
