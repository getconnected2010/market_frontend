import React, {useEffect} from 'react'
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {signinAction} from './actions/userActions'
import HomePage from './components/homePage/HomeMain'
import List from './components/List'
import NavBar from './components/NavBar'
import Sell from './components/Sell'
import Signin from './components/Signin'
import SignUp from './components/SignUp'

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(signinAction())
  },[dispatch])
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/list' component={List} />
        <Route path='/sell' component={Sell} />
        <Route path='/signin' component={Signin} />
        <Route path='/signup' component={SignUp} />
      </Switch>
    </Router>
  );
}

export default App;
