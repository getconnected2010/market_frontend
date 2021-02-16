import React from 'react'
import {useHistory} from 'react-router-dom';
import {useForm} from 'react-hook-form'
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import {ButtonComp, FormComp, InputComp} from './reusableFormComponents'
import {signupApi} from '../services/api/userApi';

const SignUp = () => {
    const history = useHistory()
    const initValues = {username:'', password:'', confirm:'', pet:''}
    const schema = Yup.object().shape({
        username: Yup.string().required('username is required')
    })
    const {register, handleSubmit, errors, reset} = useForm({
                                                    defaultValues: initValues,
                                                    mode:'onBlur',
                                                    resolver: yupResolver(schema)
                                                })
    const submitForm=async(values)=>{
        console.log(values)
        const result = await signupApi(values)
        console.log(result)
        if(result&&result.status===200){
            history.push('/')
            return
        }
        reset(initValues)
    }
    return (
        <div className='signup'>
            <FormComp onSubmit={handleSubmit(submitForm)} legend='Sign Up'>
                <InputComp name='username' label='User name :' type='text' errProp={errors} refProp={register}/>
                <InputComp name='password' label='Password :' type='password' errProp={errors} refProp={register}/>
                <InputComp name='confirm' label='Confirm Password :' type='password' errProp={errors} refProp={register}/>
                <InputComp name='pet' label='Your favourite pet name :' type='text' errProp={errors} refProp={register}/>
                <a href='#' onClick={()=> reset(initValues)}>Clear form inputs?</a>
                <ButtonComp type='submit'>Sign up</ButtonComp>
            </FormComp>
            
        </div>
    )
}

export default SignUp