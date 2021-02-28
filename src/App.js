import React, {useEffect} from 'react'
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {signinAction} from './actions/userActions'
import {fetchListAction} from './actions/listActions'
import HomePage from './components/homePage/HomeMain'
import List from './components/List'
import NavBar from './components/NavBar'
import Sell from './components/Sell'
import Signin from './components/Signin'
import SignUp from './components/SignUp'
import EditPost from './components/EditPost'


function App () {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(signinAction())
    dispatch(fetchListAction())
  },[dispatch])
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path='/' component={HomePage} />
        {/* <Route path='/edit/:post_id' component={EditPost} /> */}
        <Route path='/list' component={List} />
        <Route path='/sell/:post_id' component={Sell} />
        <Route path='/sell' component={Sell} />
        <Route path='/signin' component={Signin} />
        <Route path='/signup' component={SignUp} />
      </Switch>
    </Router>
  );
}

export default App;
