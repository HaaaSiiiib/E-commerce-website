import React from 'react'
import "./App.css";
import { Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'

import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import Transaction from './components/Transaction';
import Successful from './components/Successful';

const App = () => {
  return (
    <>
    <Navigation/>

    <Route exact path = "/">
      <Home/>
    </Route>
    
    <Route path = "/about">
      <About/>
    </Route>

    <Route path = "/login">
      <Login/>
    </Route>

    <Route path = "/signup">
      <Signup/>
    </Route>
    <Route path = "/transaction">
      <Transaction/>
    </Route>
    <Route path = "/successful">
      <Successful/>
    </Route>
    
    </>
  )
}

export default App
