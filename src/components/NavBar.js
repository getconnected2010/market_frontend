import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { ButtonComp } from './reusableFormComponents'
import {signoutAction} from '../actions/userActions'
import {signoutApi} from '../services/api/userApi'
import NavDropdown from 'react-bootstrap/NavDropdown'
import ModalComp from './ModalComp';
import {getListApi} from '../services/api/marketApi'
import {fetchListAction} from '../actions/listActions'

const NavBar = () => {
  const catagories =['auto', 'household', 'electronics', 'fashion', 'housing', 'pesonal care', 'for hire', 'everything else']
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state=>state.user)
    
  const [showModal, setShowModal] = useState(false)
  const [modalTitle, setModalTitle]= useState('')
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
        {
          user.user_id ?
          <>
          <Link className='navBar__link' to='/sell'>Post to Classifieds</Link>
          <ButtonComp onClick={signout}>Logout</ButtonComp>
          </>
          :
          <>
          <ButtonComp><Link to='/signin'>Sign in</Link></ButtonComp>
          <ButtonComp><Link to='/signup'>Sign up</Link></ButtonComp>
          </>
        }
      </div>
    </>
  )
}
export default NavBar