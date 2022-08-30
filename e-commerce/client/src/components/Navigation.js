import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { IoMdCart } from "react-icons/io";
import { MdLogin } from "react-icons/md";
import { MdPersonAdd } from "react-icons/md";
import { MdShoppingBasket } from "react-icons/md";
import { MdFace } from 'react-icons/md';
import { MdHome } from "react-icons/md";
import { MdMoney } from 'react-icons/md';


import logo from '../components/images/sustcartlogo.png';

const Navigation = () => {
    return (
        <>

            <nav className ="navbar navbar-expand-sm navbar-light bg-light">
                <a className="navbar-brand ms-5 mt-4 mb-4 pb-4" href="/"><img style={{ color: "white", borderRadius: '30px', fontSize: '25px', border: 'black', top: "0px", fontWeight: 'bold', position: 'relative', width: '60px', height: '50px' }} src={logo}/><h2> SustCart</h2></a>
                
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto pe-5 mb-2 mb-lg-1">
                        <li className="nav-item active">
                            <a className="nav-link pe-5" style ={{color :'darkblue', fontWeight:"bold",fontSize :'20px' }} href="/"> <MdHome size={22}/> Home <span className="sr-only"></span></a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link pe-5" style ={{color :'teal',fontWeight:"bold",fontSize :'20px' }}  href="/products"><MdShoppingBasket size={22}/> Shop <span className="sr-only"></span></a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link pe-5" style ={{color: 'darkmagenta',fontWeight:"bold",fontSize :'20px' }}  href="/account"><MdFace size={22}/> Profile <span className="sr-only"></span></a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link pe-5" style ={{color:'darkkhaki' ,fontWeight:"bold",fontSize :'20px' }}  href="/bank"><MdMoney size={22}/> Bank <span className="sr-only"></span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link pe-5" style ={{color :'sienna',fontWeight:"bold",fontSize :'20px' }}  href="/signup">< MdPersonAdd size={22}/> Sign Up</a>
                        </li> 
                        <li className="nav-item">
                            <a className="nav-link pe-5" style ={{color :'peru',fontWeight:"bold",fontSize :'20px' }} href="/login"><MdLogin  size={28}/> Login</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link pe-5" style ={{color :'gray', fontWeight:"bold",fontSize :'20px' }}  href="/cart"> <IoMdCart size={30}/> </a>
                        </li>
                      
                         
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navigation