import React from 'react'
import "./App.css";
import 'bootstrap/dist/css/bootstrap.css'
import { Route, Routes } from 'react-router-dom'


import Navigation from './components/Navigation'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup';
import Products from './components/Products';
import Cart from './components/Cart';
import AddProducts from './components/AddProducts';
import Success from './components/Success';
import Account from './components/Account';
import Bank from './components/Bank';
import Checkout from './components/Checkout';
import OrderSuccess from './components/OrderSuccess';

const App = () => {
  return (
    <>
    <Navigation/>
    

    <Route exact path="/">  
        <Home/>
    </Route>
    
    <Route exact path = "/login">
      <Login/>
    </Route>

    <Route exact path = "/signup">
      <Signup/>
    </Route>

    <Route exact path = "/products">
      <Products/>
    </Route>

    <Route exact path = "/cart">
      <Cart/>
    </Route>
    <Route exact path = "/addProducts">
      <AddProducts/>
    </Route>
    <Route exact path = "/success">
      <Success/>
    </Route>
    <Route exact path = "/account">
      <Account/>
    </Route>
    <Route exact path = "/checkout">
      <Checkout/>
    </Route>
    <Route exact path = "/bank">
      <Bank/>
    </Route>
    <Route exact path = "/ordersuccess">
      <OrderSuccess/>
    </Route>
    



    
    </>
  )
}

export default App