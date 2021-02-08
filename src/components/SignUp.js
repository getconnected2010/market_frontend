import React from 'react'
import {useForm} from 'react-hook-form'
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import {ButtonComp, FormComp, InputComp} from './reusableFormComponents'

const SignUp = () => {
    const initValues = {username:'', password:'', confirm:'', pet:''}
    const schema = Yup.object().shape({
        username: Yup.string().required('username is required')
    })
    const {register, handleSubmit, errors, reset} = useForm({
                                                    defaultValues: initValues,
                                                    mode:'onBlur',
                                                    resolver: yupResolver(schema)
                                                })
    const submitForm=(values)=>{
        console.log(values)
        reset(initValues)
    }
    return (
        <div className='signup'>
            <FormComp onSubmit={handleSubmit(submitForm)} legend='Sign Up'>
                <InputComp name='username' label='User name :' type='text' errProp={errors} refProp={register}/>
                <InputComp name='password' label='Password :' type='password' errProp={errors} refProp={register}/>
                <InputComp name='confirm' label='Confirm Password :' type='password' errProp={errors} refProp={register}/>
                <InputComp name='pet' label='Your favourite pet name :' type='text' errProp={errors} refProp={register}/>
                <a href='#' onClick={()=> reset(initValues)}>reset form</a>
                <ButtonComp type='submit' label={'submit'} />
            </FormComp>
            
        </div>
    )
}

export default SignUp