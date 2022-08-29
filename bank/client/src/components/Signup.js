import React, {useState} from 'react'
import signpic from "../images/sign-up.png"
import {NavLink, useHistory} from 'react-router-dom';

const Signup = () => {
    const history = useHistory(); 

    const[user, setUser]=useState({
        name:"", email:"", phone:"", address:"", type:"savings", password:""
    });
    
    let name, value;

    const handleInputs= (e) =>{
        //console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({...user, [name]:value});
        

    }

const PostData = async (e) =>{
    e.preventDefault();

    const {name, email, phone,address,type,password} = user;
    
    const res = await fetch("https://bank.cse446.ml/api/v1/auth/signup", {
        method : "POST", 
        headers: {
             "Content-Type": "application/json",
             "Accept": "application/json"
        },
        body: JSON.stringify({
            name, email, phone,address,type,password
        })
    });

    const data = await res.json();
    //localStorage.setItem(JSON.stringify(data)); 

    if (res.status != 201){
        window.alert ("Invalid Registration");
    }
    else {

         
        localStorage.setItem("accNum", data.accountNumber)
         //window.alert("Registration Successful\nAccount Number: " + data.accountNumber);
         //window.prompt("Registration Successful\nAccount Number: " + data.accountNumber);
         //console.log("Successful Registration");

         history.push("/successful")
    }


}



    return(

            <section className='signup'>
                <div className='container  mt-5'>
                    <div  className='signup-content'>
                        <div  className='signup-form'>
                            <h2 style={{ color: "white" }}className='form-title mb-5'>Sign Up</h2>
                                <form method="POST" className="register-form" id = "register-form">


                                <div class="input-container">
                                    <i class="fa fa-user icon"></i>
                                        <input class="input-field" type="text" placeholder="Name" name="name"
                                            value={user.name}
                                            onChange={handleInputs}

                                        />
                                </div>


                                <div class="input-container">
                                    <i class="fa fa-envelope icon"></i>
                                        <input class="input-field" type="text" placeholder="Email" name="email"
                                            value={user.email}
                                            onChange={handleInputs}
                                        />
                                </div>

                               

                                <div class="input-container">
                                    <i class="fa fa-phone icon"></i>
                                        <input class="input-field" type="string" placeholder="Phone" name="phone"
                                            value={user.phone}
                                            onChange={handleInputs}
                                        />
                                </div>

                                <div class="input-container">
                                    <i class="fa fa-home icon"></i>
                                        <input class="input-field" type="text" placeholder="Address" name="address"
                                            value={user.address}
                                            onChange={handleInputs}
                                        />
                                </div>

                                <div  class="input-container pt-2 mb-4 pb-2">
                                    <i class="fa fa-list icon pe-3" ></i>
                                        <select style={{ border:'none', color: 'lightgray', width: '450px',height: '35px', backgroundColor: 'inherit' }}  class="custom-select" name="type">
                                            <option selected style={{color:'gray'}}>Type of account</option>
                                            <option value="saving">Saving</option>
                                            <option value="Deposit">Deposit</option>
                                            <option value="Loan">Loan</option>
                                        </select>
                                 </div>


                                    <div class="input-container">
                                        <i class="fa fa-key icon"></i>
                                            <input class="input-field" type="password" placeholder="Password" name="password"
                                                value={user.password}
                                                onChange={handleInputs}
                                            />
                                    </div>

                                   
                               
                                
                                    <button style={{borderRadius:'30px',fontSize:'20px',border:'black',fontWeight:'bold',position:'relative', left:'165px',width:'200px',height:'50px'}} 
                                    type="submit" name='signup' id='signup' class="btn btn-primary mt-5" onClick={PostData} >Register</button>
                                </form> 
                            </div> 

                            <div className="signup-image" style = {{position : 'relative', float:'right', top: '-500px', left:'100px'}}>
                                <figure>
                                    <img src={signpic} alt='registration pic'/>
                                </figure>
                                <NavLink to="/login" className="signup-image-link" style={{color :'white'}}>Already Registered?</NavLink>

                            </div>
                    </div>

                </div>

            </section>

    )
}

export default Signup
