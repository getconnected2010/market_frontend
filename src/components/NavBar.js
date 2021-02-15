import React from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { ButtonComp } from './reusableFormComponents'
import {signoutAction} from '../actions/userActions'
import {signoutApi} from '../services/api/userApi'

const NavBar = () => {
  const dispatch = useDispatch()
  const user = useSelector(state=>state.user)

  const signout =async()=>{
    console.log('inside signout')
      await signoutApi()
      dispatch(signoutAction())
      window.location.href='/'
  }
  
  return (
    <div className='navBar'>
      <Link to='/'>Home</Link>
      {
        user.user_id ?
        <>
        <Link to='/sell'>Post to Classifieds</Link>
        <ButtonComp onClick={signout} label='Logout' />
        </>
        :
        <>
        <Link to='/signup'>Sign up</Link>
        <Link to='/signin'>Sign in</Link>
        </>
      }
    </div>
  )
}
export default NavBar