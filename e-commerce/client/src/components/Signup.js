import React, {useState} from 'react'
import { useHistory} from 'react-router-dom';
import '../App.css'

const Signup = () => {
    const history = useHistory(); 

    const[user, setUser]=useState({
        name:"", email:"", phone:"",address:"",password:"",
    });
    
    let name, value;

    const handleInputs= (e) =>{
        name = e.target.name;
        value = e.target.value;

        setUser({...user, [name]:value});
        

    }

const PostData = async (e) =>{
    e.preventDefault();

    const {name, email, phone,address,password} = user;
    
    const res = await fetch("https://ecom.cse446.ml/api/v1/auth/signup", {
        method : "POST", 
        headers: {
             "Content-Type": "application/json",
             "Accept": "application/json "
        },
        body: JSON.stringify({
            name, email, phone,address,password
        })
    });

    const data = await res.json();
    console.log(data);


    if (res.status != 201){
        window.alert ("Invalid Registration");
    }
    else {
        
         console.log("Successful Registration");
         history.push("/success");
    }


}



    return(
        <div style={{position : 'relative', top:'-50px',backgroundImage: 'url("https://www.completechaintech.com/sites/default/files/2022-03/difference_between_websites_and_ecommerce.jpeg")', 
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height:'900px'
        

}}  className='background'>
        <div  className='container'>

            <div className='signup'>
                
                    <div  className='signup-content' style={{left:'200px'}}> 
                        <div  className='signup-form'>
                            <h2 style ={{color :'white',fontFamily:'cursive',fontWeight:"bolder",fontSize :'70px' }}className='form-title  pt-5 mt-5 mb-5'>Sign Up</h2>
                                <form method="POST" className="register-form" id = "register-form">


                                <div class="input-container">
                                    <i class="fa fa-user icon"></i>
                                        <input class="input-field" style ={{color :'white',fontFamily:'cursive',fontWeight:"bolder",fontSize :'25px' }} type="text" placeholder="Name" name="name"
                                            value={user.name}
                                            onChange={handleInputs}

                                        />
                                </div>


                                <div class="input-container">
                                    <i class="fa fa-envelope icon"></i>
                                        <input class="input-field" style ={{color :'white',fontFamily:'cursive',fontWeight:"bolder",fontSize :'25px' }}type="text" placeholder="Email" name="email"
                                            value={user.email}
                                            onChange={handleInputs}
                                        />
                                </div>

                                <div class="input-container">
                                    <i class="fa fa-phone icon"></i>
                                        <input class="input-field" style ={{color :'white',fontFamily:'cursive',fontWeight:"bolder",fontSize :'25px' }} type="text" placeholder="Phone" name="phone"
                                            value={user.phone}
                                            onChange={handleInputs}
                                        />
                                </div>

                                <div class="input-container">
                                    <i class="fa fa-home icon"></i>
                                        <input class="input-field" style ={{color :'white',fontFamily:'cursive',fontWeight:"bolder",fontSize :'25px' }} type="text" placeholder="Address" name="address"
                                            value={user.address}
                                            onChange={handleInputs}
                                        />
                                </div>

                                    <div class="input-container">
                                        <i class="fa fa-key icon"></i>
                                            <input class="input-field" style ={{color :'white',fontFamily:'cursive',fontWeight:"bolder",fontSize :'25px' }}  type="password" placeholder="Password" name="password"
                                                value={user.password}
                                                onChange={handleInputs}
                                            />
                                    </div>

                                    
                               
                                
                                    <button style={{borderRadius:'30px',fontSize:'20px',border:'black',fontWeight:'bold',position:'relative', left:'165px',width:'200px',height:'50px'}} 
                                    type="submit" name='signup' id='signup' class="btn btn-primary mt-5" onClick={PostData} >Register</button>
                                </form> 
                            </div> 



                            </div>
                    </div>
                </div>
            </div>

    )
}

export default Signup