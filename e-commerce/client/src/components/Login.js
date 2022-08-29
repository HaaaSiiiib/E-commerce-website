import React, {useState} from 'react'
import {NavLink, useHistory} from "react-router-dom"

const Login = () => {

    const history=useHistory();
    const [email, setEmail]= useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e) =>{
        e.preventDefault();

        const res = await fetch(' https://ecom.cse446.ml/api/v1/auth/login', {
            method :"POST",
            headers: {
                "Content-Type" : "application/json",
                "Accept": "applocation/json"
            },
            body:JSON.stringify({
                 email,
                 password
            })
        });

        const data = await res.json();
        localStorage.setItem("info",JSON.stringify(data)); 

        
        if(res.status === 401 || !data){
            console.log(data)
            window.alert ("Invalid account number or password");

        }
        else {
            
            window.alert("Login Successful");
            localStorage.setItem('id',data.id)
            localStorage.setItem('session', data.session)
            history.push("/account")
        }

    }

    return(
       <>
       <section style={{backgroundImage: 'url("https://www.completechaintech.com/sites/default/files/2022-03/difference_between_websites_and_ecommerce.jpeg")', 
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                height:'900px'
                
        
        }} className='signin' >
                <div  className='container'>
                    <div  className='signin-content'>

                    

                        <div  className='signin-form' style = {{position : 'relative', top: '80px', left:'370px'}}>
                            <h2 style={{ color: "white", fontFamily:'cursive' , fontWeight:"bolder", fontSize :'70px' }}className='form-title mb-5' >Log In</h2>
                                <form mothod ="POST" className="register-form" id = "register-form">

                                <div class="input-container">
                                    <i class="fa fa-book icon"></i>
                                        <input class="input-field" style ={{color :'white',fontFamily:'cursive',fontWeight:"bolder", fontSize :'25px'  }} type="text" 
                                        value={email}
                                        onChange = {(e) => setEmail(e.target.value)}
                                        placeholder="Enter Email adress" name="email"/>
                                </div>

                                    <div class="input-container">
                                        <i class="fa fa-key icon"></i>
                                            <input class="input-field" style ={{color :'white',fontFamily:'cursive',fontWeight:"bolder",fontSize :'25px' }} type="password" 
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