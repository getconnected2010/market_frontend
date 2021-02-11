import React from 'react'
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom'
import HomePage from './components/HomePage'
import List from './components/List'
import NavBar from './components/NavBar'
import Sell from './components/Sell'
import Signin from './components/Signin'
import SignUp from './components/SignUp'

function App() {
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
