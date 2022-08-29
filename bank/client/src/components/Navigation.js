import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';
import logo from "../images/sust-logo-bw.png"

const Navigation = () => {



    const [isLoggedIn, setIsLoggedIn] = useState(false);

    if (localStorage.getItem('session')) {
        setIsLoggedIn(true);
    }



    if (isLoggedIn) {
        return (

            <nav className="navbar navbar-expand-sm bg-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand ms-5 " to="/">
                        <img src={logo} width={70} height={70} alt="logo" />
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto pe-5 mb-2 mb-lg-1">
                            <li className="nav-item me-3">
                                <NavLink className="nav-link active " aria-current="page" to="/">Home<span className='sr-only'></span></NavLink>
                            </li>


                            <li className="nav-item">
                                <NavLink className="nav-link me-3" to="/about">Account</NavLink>
                            </li>
                            <li className="nav-item">

                                <NavLink className="nav-link me-3" to="/" onClick={() => { localStorage.removeItem('session') }} >Log Out</NavLink>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>

        )
    }

    else {

        return (


            <nav className="navbar navbar-expand-sm bg-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand ms-5 " to="/">
                        <img src={logo} width={70} height={70} alt="logo" />
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto pe-5 mb-2 mb-lg-1">
                            <li className="nav-item me-3">
                                <NavLink className="nav-link active " aria-current="page" to="/">Home<span className='sr-only'></span></NavLink>
                            </li>


                            

                            <li className="nav-item" >
                                <NavLink className="nav-link me-3" to="/login">Login</NavLink>

                            </li>

                            <li className="nav-item">

                                <NavLink className="nav-link me-3" to="/signup">Sign Up</NavLink>
                            </li>


                        </ul>
                    </div>
                </div>
            </nav>


        )
    }
}

export default Navigation