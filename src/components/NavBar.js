import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='navBar'>
      <Link to='/'>Home</Link>
      <Link to='/signup'>Sign up</Link>
      <Link to='/'>Not assigned</Link>
    </div>
  )
}
export default NavBar