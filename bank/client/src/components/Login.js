import React, {useState} from 'react'
import loginpic from "../images/login.png"
import {NavLink, useHistory} from "react-router-dom"

const Login = () => {

    const history=useHistory();
    const [accountNumber, setAccountNumber]= useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e) =>{
        e.preventDefault();

        const res = await fetch('https://bank.cse446.ml/api/v1/auth/login', {
            method :"POST",
            headers: {
                "Content-Type" : "application/json",
                "Accept": "applocation/json"
            },
            body:JSON.stringify({
                 accountNumber,
                 password
            })
        });

        const data = await res.json();
        
        if(res.status === 401 || !data){
            window.alert ("Invalid account number or password");

        }
        else {
            localStorage.setItem('session', data.session);
            localStorage.setItem('accNum', accountNumber);
            console.log(localStorage.getItem('session'));
            history.push("/")
        }

    }

    return(
       <>
       <section className='signin'>
                <div className='container  mt-5'>
                    <div  className='signin-content'>

                        <div className="signin-image" style = {{position : 'relative', float:'right', top: '100px', left:'100px'}}>
                                <figure>
                                    <img src={loginpic} alt='login pic'/>
                                </figure>
                                <p style={{color:'white',position:'relative',  left:'230px', fontWeight:"bold",fontSize:"20px"}} >New here?</p>
                                <NavLink to="/signup" className="signup-image-link" style={{ color :'white', position:'relative',  left:'200px', fontWeight:"bold",fontSize:"20px" }}>Create an account</NavLink>

                        </div>


                        <div  className='signin-form' style = {{position : 'relative', top: '250px', left:'100px'}}>
                            <h2 style={{ color: "white" }}className='form-title mb-5'>Log In</h2>
                                <form mothod ="POST" className="register-form" id = "register-form">

                                <div class="input-container">
                                    <i class="fa fa-book icon"></i>
                                        <input class="input-field" type="text" 
                                        value={accountNumber}
                                        onChange = {(e) => setAccountNumber(e.target.value)}
                                        placeholder="Enter Account Number" name="accountNumber"/>
                                </div>

                                    <div class="input-container">
                                        <i class="fa fa-key icon"></i>
                                            <input class="input-field" type="password" 
                                             value={password}
                                             onChange = {(e) => setPassword(e.target.value)}
                                            placeholder="Enter Password" name="password"/>
                                    </div>

                                
                                    <button style={{borderRadius:'30px',fontSize:'20px',border:'black',fontWeight:'bold',position:'relative', left:'165px',width:'200px',height:'50px'}} 
                                    type="submit" name='signin' id='signin' class="btn btn-primary mt-5 " onClick={loginUser} >Log In</button>
                                </form> 
                            </div> 

                    </div>

                </div>

            </section>


       </>
    )
}

export default Login