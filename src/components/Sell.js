import React, {useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import * as Yup from 'yup';
import {ButtonComp, CheckboxComp, CollapseComp, FadeComp, FormComp, InputComp, OverlayComp, SelectComp} from './reusableFormComponents'
import { yupResolver } from '@hookform/resolvers/yup';
import {newPostApi, updatePostApi} from '../services/api/marketApi'

const checkboxMessage= "Your email will be kept private. Market will securely email you messages from buyers."

const Sell = () => {
    const history = useHistory()
    const params = useParams()
    const listArr = useSelector(state=>state.list)
    const [showEmail, setShowEmail] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const post_id = params.post_id
    let initValues = {catagory:'', email:'',title:'', description:'', pics:'', price:'', contact:'', keepPic:''}
    let post;
    if(post_id && listArr.length>0){
        post = listArr.filter(item=>item.post_id===Number(post_id))
    }
    if(post && post.length>0){
        initValues.catagory=post[0].catagory
        initValues.title= post[0].title
        initValues.description= post[0].description
        initValues.price= post[0].price
        initValues.contact= post[0].contact==='true'? post[0].contact: ''
        initValues.email= post[0].email
    }
    const selectOptions=[
        {label:'', value:''}, {label:'auto', value:'auto'}, {label:'household', value:'household'}, 
        {label:'electronics', value:'electronics'},{label:'fashion', value:'fashion'}, {label:'housing', value:'housing'},
        {label:'pesonal care', value:'pesonal care'},{label:'for hire', value:'for hire'}, {label:'everything else', value:'everything else'}
    ]
    const selectArr =['auto', 'household', 'electronics', 'fashion', 'housing', 'pesonal care', 'for hire', 'everything else']
    const schema = Yup.object().shape({
        catagory: Yup.string().required('A catagory is required'),
        title: Yup.string().required('A title is required'),
        description: Yup.string().required('A description is required'),
        price: Yup.string(),
        email: Yup.string().when('contact', {
            is: true,
            then: Yup.string().required('please enter an email address')
        })
    })

    const contactMe = (e)=>{
        e.target.checked ? setShowEmail(true) : setShowEmail(false)
    }
  
    const submitForm=async(values)=>{
        values.post_id= post_id
        setSubmitting(true)
        const result = post? await updatePostApi(values) : await newPostApi(values)
        setSubmitting(false)
        if(!result) return alert('application error posting to classifieds. Please try again.')
        if(result.status&&result.status===200) {
            alert('successfully posted to classifieds')
            sessionStorage.removeItem('listArr')
            history.push('/')
            return
        }
        if(result.response&&result.response.data&&result.response.data.msg) {
            alert(result.response.data.msg)
            return
        } 
        alert('application error posting to classifieds. Please try again.')
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
                <InputComp label='Post title :' name='title' type='text' errProp={errors} refProp={register} size='lg' />
                <InputComp label='Description :' name='description' as='textarea' rows={3} errProp={errors} refProp={register} />
                <InputComp label='Price :' name='price' type='text' errProp={errors} refProp={register} size='lg' />
                {
                    post&&
                    <CheckboxComp label='Keep old pictures?' name='keepPic' refProp={register}/>
                }
                <InputComp label='Attach upto four pictures :' name='pics' type='file' multiple errProp={errors} refProp={register} />
                {/* triggers a tooltip with a message on checkbox area hover */}
                <OverlayComp message={checkboxMessage} >
                    <CheckboxComp onClick={contactMe}  label='Add an email so buyers can contact you.' name='contact' refProp={register}/>
                </OverlayComp>
                {/* collapses email input dependent on checkbox state above */}
                <CollapseComp openProp={showEmail|| initValues.contact==='true'}>
                    <InputComp className='sell__email' label='Email :' name='email' type='text' errProp={errors} refProp={register} />
                </CollapseComp>
                <a href='#' onClick={()=>{reset(initValues); setShowEmail(false)}}>Clear form inputs?</a>
                <ButtonComp disabled={submitting} type='submit'>{submitting? 'Please wait...':'Post Ad'}</ButtonComp>
            </FormComp> 
        </div>
    )
}

export default Sell
