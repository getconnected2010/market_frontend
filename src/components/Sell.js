import React from 'react'
import {useForm} from 'react-hook-form';
import * as Yup from 'yup';
import {ButtonComp, FormComp, InputComp} from './reusableFormComponents'
import { yupResolver } from '@hookform/resolvers/yup';
import {newPostApi} from '../services/api/marketApi'

const Sell = () => {
    const initValues= {title:'', description:'', email:'', pics:''}
    const schema = Yup.object().shape({
        title: Yup.string(),
        description: Yup.string(),
        email: Yup.string()
    })
    const submitForm=async(values)=>{
        console.log(values)
        newPostApi(values)
        //reset(initValues)
    }
    const {register, handleSubmit, errors, reset} = useForm({
                                                        mode: 'onBlur',
                                                        defaultValues: initValues,
                                                        resolver: yupResolver(schema)
                                                    })
    return (
        <div className='sell'>
            <FormComp onSubmit={handleSubmit(submitForm)} legend='Post to classifieds'>
                <InputComp label='Email :' name='email' type='text' errProp={errors} refProp={register} />
                <InputComp label='Posting title :' name='title' type='text' errProp={errors} refProp={register} />
                <InputComp label='Posting description :' name='description' as='textarea' rows={3} errProp={errors} refProp={register} />
                <InputComp label='Attach upto four pictures :' name='pics' type='file' multiple errProp={errors} refProp={register} />
                <a href='#' onClick={()=>reset(initValues)}>Clear form inputs?</a>
                <ButtonComp label='Submit' type='submit' />
            </FormComp>
            
        </div>
    )
}

export default Sell
