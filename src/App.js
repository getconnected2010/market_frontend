import React from 'react'
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom'
import NavBar from './components/NavBar'
import SignUp from './components/SignUp'


function App() {
  return (
    <Router>
      <NavBar />
      <SignUp />
    </Router>
  );
}

export default App;
