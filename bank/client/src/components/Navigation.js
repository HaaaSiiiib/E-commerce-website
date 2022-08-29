import React from 'react'

import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';
import logo from "../images/sust-logo-bw.png"

const Navigation = () => {




    return (
        <>
            <nav  className="navbar navbar-expand-sm bg-light">
              
                    <NavLink className="navbar-brand ms-5 " to="/">
                        <img src={logo} width={70} height={70} alt="logo" />
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>


                    <ul className="navbar-nav ms-auto pe-5 mb-2 mb-lg-1">
                        <li className="nav-item me-5">
                            <NavLink  style={{ fontFamily:'sans-serif', fontSize:'20px', fontWeight :'bold'}}className="nav-link active " aria-current="page" to="/">Home<span className='sr-only'></span></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink style={{ fontFamily:'sans-serif', fontSize:'20px', fontWeight :'bold'}} className="nav-link me-5" to="/about">About</NavLink>
                        </li>



                        <li className="nav-item" >
                            <NavLink  style={{ fontFamily:'sans-serif', fontSize:'20px', fontWeight :'bold'}} className="nav-link me-5" to="/login">Login</NavLink>

                        </li>

                        <li className="nav-item">

                            <NavLink style={{ fontFamily:'sans-serif', fontSize:'20px', fontWeight :'bold'}} className="nav-link me-5" to="/signup">Sign Up</NavLink>
                        </li>
                        <li className="nav-item">

                            <NavLink  style={{ fontFamily:'sans-serif', fontSize:'20px', fontWeight :'bold'}}className="nav-link me-5" to="/" onClick={() => { localStorage.removeItem('session'); location.reload() }} >Log Out</NavLink>
                        </li>


                    </ul>
                
            </nav>
        </>

    )
}


export default Navigation