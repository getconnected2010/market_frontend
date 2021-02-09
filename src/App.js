import React from 'react'
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom'
import HomePage from './components/HomePage'
import NavBar from './components/NavBar'
import Sell from './components/Sell'
import SignUp from './components/SignUp'

console.log('rendered')
function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/sell' component={Sell} />
        <Route path='/signup' component={SignUp} />
      </Switch>
    </Router>
  );
}

export default App;
