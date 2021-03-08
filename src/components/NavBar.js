import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup';
import { ButtonComp, FormComp, InputComp } from './reusableFormComponents'
import {signoutAction} from '../actions/userActions'
import {signoutApi} from '../services/api/userApi'
import NavDropdown from 'react-bootstrap/NavDropdown'
import ModalComp from './ModalComp';
import {getListApi, myPostsApi} from '../services/api/marketApi'
import {fetchListAction} from '../actions/listActions'
import {searchApi} from '../services/api/marketApi'

const NavBar = () => {
  const catagories =['auto', 'household', 'electronics', 'fashion', 'housing', 'pesonal care', 'for hire', 'everything else']
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state=>state.user)
  const [showModal, setShowModal] = useState(false)
  const [modalTitle, setModalTitle]= useState('')
  const initValues={search:''}
  const schema= Yup.object().shape({
    search: Yup.string().required('?')
  })
  const {register, handleSubmit, errors, reset} = useForm({
    defaultValues: initValues,
    resolver: yupResolver(schema),
    mode:'onBlur'
  })
  const searchDb=async(values)=>{
    const result = await searchApi(values.search)
    reset(initValues)
    if(result&&result.status===200&&result.data.length>0){
      sessionStorage.setItem('listArr', JSON.stringify(result.data))
      dispatch(fetchListAction())
      return history.push('/list')
    }
    if(result&&result.status===200&&result.data.length===0){
      setModalTitle('no matching keywords found')
      return setShowModal(true)
    }
    if(result&&result.response&&result.response.data&&result.response.data.msg){
      setModalTitle(result.response.data.msg)
      return setShowModal(true)
    }else{
      setModalTitle('error searching keyword')
      return setShowModal(true)
    }
  }
  const fetchList=async(e)=>{
      const result = await getListApi(e.target.id)
      if(result&&result.status===200&&result.data){
          if(result.data.length>0){
              sessionStorage.setItem('listArr', JSON.stringify(result.data))
              dispatch(fetchListAction())
              history.push('/list')
              return
          }else{
              setModalTitle('No items in that caragory. Please make anohter selection')
              setShowModal(true)
          }
      } else if(result&&result.response&&result.response.data&&result.response.data.msg){
          setModalTitle(result.response.data.msg)
          setShowModal(true)
      }else{
          setModalTitle('Error fetching items in that catagory. Please try again.')
          setShowModal(true)
      }
    }
  const fetchMyPosts=async()=>{
    const result= await myPostsApi()
    if(!result){
      setModalTitle('Error fetching your posts')
      setShowModal(true)
      return
    }
    if(result.status===200 && Array.isArray(result.data)){
      sessionStorage.setItem('listArr', JSON.stringify(result.data))
     window.location.href ='/list'
      return
    }
    if(result.response&&result.response.data&&result.response.data.msg){
      setModalTitle(result.response.data.msg)
      setShowModal(true)
      return
    }
    setModalTitle('Error fetching your posts')
    setShowModal(true)
    return
  }
  const signout =async()=>{
      await signoutApi()
      dispatch(signoutAction())
      window.location.href='/'
  }
  
  return (
    <>
      <ModalComp title={modalTitle} showProp={showModal} setShowProp={setShowModal} />
      <div className='navBar'>
        <Link className='navBar__link' to='/'>Home</Link>
        <NavDropdown className='navBar__link' title="Catagories" >
            {
                catagories.map(item=>(
                    <NavDropdown.Item key={item} id={item} onClick={fetchList} >{item}</NavDropdown.Item>
                ))
            }
        </NavDropdown>
        <FormComp onSubmit={handleSubmit(searchDb)}>
          <InputComp type='text' name='search' refProp={register} errProp={errors} />
          <ButtonComp type='submit'>Search</ButtonComp> 
        </FormComp>
        { user.user_id ?
            <NavDropdown className='navBar__link' title="More" >
                <NavDropdown.Item onClick={()=> history.push('/sell')}>Post to Classifieds</NavDropdown.Item>
                <NavDropdown.Item onClick={fetchMyPosts}>My posts</NavDropdown.Item>
                <NavDropdown.Item onClick={()=> history.push('/change')} >Change password</NavDropdown.Item>
                <NavDropdown.Item onClick={signout}>Logout</NavDropdown.Item>
            </NavDropdown>
          :
          <>
            <ButtonComp><Link to='/signin'>Sign-in</Link></ButtonComp>
            <ButtonComp><Link to='/signup'>Sign-up</Link></ButtonComp>
          </>
        }
      </div>
    </>
  )
}
export default NavBar