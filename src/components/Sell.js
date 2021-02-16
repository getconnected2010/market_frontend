import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useForm} from 'react-hook-form';
import * as Yup from 'yup';
import {ButtonComp, CheckboxComp, CollapseComp, FadeComp, FormComp, InputComp, OverlayComp, SelectComp} from './reusableFormComponents'
import { yupResolver } from '@hookform/resolvers/yup';
import {newPostApi} from '../services/api/marketApi'

const checkboxMessage= "Your email will be kept private. Market will securely email you messages from buyers."

const Sell = () => {
    const history = useHistory()
    const [showEmail, setShowEmail] = useState(false)
    const initValues= {catagory:'', email:'',title:'', description:'', pics:'', contact:''}
    const selectOptions=[
        {label:'auto', value:'auto'}, {label:'household', value:'household'}, {label:'electronics', value:'electronics'},
        {label:'fashion', value:'fashion'}, {label:'housing', value:'housing'}, {label:'pesonal care', value:'pesonal care'},
        {label:'for hire', value:'for hire'}, {label:'everything else', value:'everything else'}
    ]
    const selectArr =['auto', 'household', 'electronics', 'fashion', 'housing', 'pesonal care', 'for hire', 'everything else']
    const schema = Yup.object().shape({
        catagory: Yup.string().required('A catagory is required'),
        title: Yup.string().required('A title is required'),
        description: Yup.string().required('A description is required'),
        email: Yup.string().when('contact', {
            is: true,
            then: Yup.string().required('please enter an email address')
        })
    })
    const submitForm=async(values)=>{
        const result = await newPostApi(values)
        if(result.response&&result.response.data&&result.response.data.msg) return alert(result.response.data.msg)
        if(result.status&&result.status===200) {
            alert('successfully posted to classifieds')
            history.push('/')
            return
        }
        alert('application error posting to classifieds. Please try again.')
        reset(initValues)
        setShowEmail(false)
    }
    const {register, handleSubmit, errors, reset} = useForm({
                                                        mode: 'onBlur',
                                                        defaultValues: initValues,
                                                        resolver: yupResolver(schema)
                                                    })
    return (
        <div className='sell'>
            <FormComp onSubmit={handleSubmit(submitForm)} legend='Post to classifieds'>
                <SelectComp label='Select a catagory :' name='catagory' errProp={errors} refProp={register} selectOptions={selectOptions} size="lg"  custom/>
                <InputComp label='Posting title :' name='title' type='text' errProp={errors} refProp={register} size='lg' />
                <InputComp label='Posting description :' name='description' as='textarea' rows={3} errProp={errors} refProp={register} />
                <InputComp label='Attach upto four pictures :' name='pics' type='file' multiple errProp={errors} refProp={register} />
                {/* triggers a tooltip with a message on checkbox area hover */}
                <OverlayComp message={checkboxMessage} >
                    <CheckboxComp onClick={()=>setShowEmail(!showEmail)} label='Add an email so buyers can contact you.' name='contact' refProp={register}/>
                </OverlayComp>
                {/* collapses email input dependent on checkbox state above */}
                <CollapseComp openProp={showEmail}>
                    <InputComp className='sell__email' label='Email :' name='email' type='text' errProp={errors} refProp={register} />
                </CollapseComp>
                <a href='#' onClick={()=>{reset(initValues); setShowEmail(false)}}>Clear form inputs?</a>
                <ButtonComp type='submit'>Post Ad</ButtonComp>
            </FormComp>
            
        </div>
    )
}

export default Sell
