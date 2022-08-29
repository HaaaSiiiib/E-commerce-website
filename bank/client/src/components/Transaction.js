import React, {useState} from 'react'
import {useHistory} from 'react-router-dom';


const Transaction = () => {

    const history = useHistory();
    const[transactionData, setTransactionData]=useState({
        accountNumber:"", amount:"", description:""
    });

    let name, value;

    const handleInputs= (e) =>{
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setTransactionData({...user, [name]:value});
        

    }

    const PostTransaction = async (e) =>{
        e.preventDefault();
    
        const {accountNumber, amount, description} = user;
        
        const res = await fetch("https://bank.cse446.ml/api/v1/transactions", {
            method : "POST", 
            headers: {
                 "Content-Type": "application/json",
                 "Accept": "application/json "
            },
            body: JSON.stringify({
                accountNumber, amount, description
            })

        });
    
        const transactionInfo = res.json();
        localStorage.setItem(JSON.stringify(transactionInfo)); 
    
        if (transactionInfo.status === !transactionInfo){
            window.alert ("Invalid Transaction");
        }
        else {
             window.alert("Transaction Successful");
             console.log("Successful Transaction");
    
             history.pushState("/")
        }


  return (
    <section className='signup'>
                <div className='container  mt-5'>
                    <div  className='signup-content'>
                        <div  className='signup-form'>
                            <h2 style={{ color: "white" }}className='form-title mb-5'>Sign Up</h2>
                                <form method="POST" className="register-form" id = "register-form">


                                <div class="input-container">
                                    <i class="fa fa-user icon"></i>
                                        <input class="input-field" type="text" placeholder="Account Number" name="accuontNumber"
                                            value={user.accountNumber}
                                            onChange={handleInputs}

                                        />
                                </div>


                                <div class="input-container">
                                    <i class="fa fa-envelope icon"></i>
                                        <input class="input-field" type="number" placeholder="Amount" name="amount"
                                            value={user.amount}
                                            onChange={handleInputs}
                                        />
                                </div>

                                <div class="input-container">
                                    <i class="fa fa-book icon"></i>
                                        <input class="input-field" type="text" placeholder="Description" name="description"
                                            value={user.description}
                                            onChange={handleInputs}
                                        />
                                </div>

                                <button style={{borderRadius:'30px',fontSize:'20px',border:'black',fontWeight:'bold',position:'relative', left:'165px',width:'200px',height:'50px'}} 
                                    type="submit" name='signup' id='signup' class="btn btn-primary mt-5" onClick={PostTransaction} >Make Transaction</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
    )
  }
}

export default Transaction