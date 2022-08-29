import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';

const Bank = () => {

    const history = useHistory();
    const [accountNumber, setAccountNumber] = useState('');
    const [password, setPassword] = useState('');
    const [bankData, setBankData] = useState('');

    const bankLogin = async (e) => {

        e.preventDefault();

        const res = await fetch('https://bank.cse446.ml/api/v1/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "applocation/json"

            },
            body: JSON.stringify({
                accountNumber,
                password
            })
        });

        const data = await res.json();
        console.log(data)

        if (res.status != 200 || !data) {
            window.alert("Invalid account number or password");

        }
        else {
            localStorage.setItem('bankToken', data.session);
            localStorage.setItem('accNum', accountNumber);
            console.log(localStorage.getItem('bankToken'));
            window.location.reload();
        }
    }


    const getBankInfo = async () => {
        const res2 = await fetch('https://bank.cse446.ml/api/v1/accounts/' + localStorage.getItem('accNum'), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "applocation/json",
                "Authorization": "Bearer " + localStorage.getItem('bankToken')

            }


        });

        const data2 = await res2.json();

        if (res2.status != 200 || !data2) {
            //window.alert("Invalid account number or password");

        }

        setBankData(data2);
        console.log(data2);
    }

    useEffect(() => {
        getBankInfo(); // This is to be executed when the state changes
    }, []);

    //setData(true);









    const bankToken = localStorage.getItem("bankToken")
    if (!bankToken) {


        return (
            <>
                <section style={{
                    backgroundImage: 'url("https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2021/04/getty_bank-accts_040521.jpeg.jpg")',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    height: '900px',


                }} className='signin' >
                    <div className='container'>
                        <div className='signin-content'>



                            <div className='signin-form' style={{ position: 'relative', top: '80px', left: '270px' }}>
                                <h2 style={{ color: "white", fontFamily: 'ubuntu', fontWeight: "bolder", fontSize: '70px' }} className='form-title mb-5' >Log into your Bank account</h2>
                                <form mothod="POST" className="register-form" id="register-form">

                                    <div class="input-container">
                                        <i class="fa fa-book icon"></i>
                                        <input class="input-field" style={{ color: 'white', fontFamily: 'cursive', fontWeight: "bolder", fontSize: '25px' }} type="text"
                                            value={accountNumber}
                                            onChange={(e) => setAccountNumber(e.target.value)} placeholder="Enter Bank Account Number" name="accountNumber" />
                                    </div>

                                    <div class="input-container">
                                        <i class="fa fa-key icon"></i>
                                        <input class="input-field" style={{ color: 'white', fontFamily: 'cursive', fontWeight: "bolder", fontSize: '25px' }} type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter Password" name="password" />
                                    </div>


                                    <button style={{ borderRadius: '30px', fontSize: '20px', border: 'black', fontWeight: 'bold', position: 'relative', left: '165px', width: '200px', height: '50px' }}
                                        type="submit" name='signin' id='signin' class="btn btn-primary mt-5 " onClick={bankLogin} >Log In</button>
                                </form>
                            </div>

                        </div>

                    </div>

                </section>


            </>

        )
    }
    else {




        return (

            <>{bankData &&
                <div className="container emp-profile">
                    <div>
                        <div className="row">
                            <div className="col-md-4">
                                <img style={{ position: 'relative', height: '200px', top: '20px', left: '200px', width: '200px' }} src={'https://cdn-icons-png.flaticon.com/512/64/64572.png'} />
                            </div>

                            <div className="col-md-6">
                                <div className="profiel-head">
                                    <h5 style={{ position: 'relative', color: 'black', top: '20px' }}>{bankData[0].name}</h5>
                                    <h6 style={{ position: 'relative', color: 'black', top: '20px' }}>{bankData[0].email}</h6>


                                    <ul className="nav nav-tabs">
                                        <li className="nav-item" role="tablist">
                                            <a className="nav-link mt-5 " style={{ color: 'gray', top: '20px' }} id='about-tab' data-toggle="tab" href="#about" role="tab" aria-controls="about" aria-selected='home'>About</a>
                                        </li>

                                    </ul>
                                </div>

                            </div>



                            <div style={{ position: 'relative', left: '-150px', top: '20px' }} className='col-md-2'>
                                <input type="submit" className="profil-edit-btn" name='btnAddMore' value="Log out" 
                                onClick={()=>{localStorage.removeItem('bankToken'); location.reload()}}
                                />
                            </div>



                            <div style={{ position: 'relative', left: '175px', top: '40px' }} className='col-md-8 pl-5 about-info'>
                                <div className="tab-content" id="myTabcontent">
                                    <div className='tab-pane fade show active' id="about" role="tabpanel" aria-labelledby="about-tab">
                                        <div className="row">
                                            <div style={{ position: 'relative', color: 'black', top: '20px' }} className='col-md-6'>
                                                <label >Account Number</label>
                                            </div>
                                            <div style={{ position: 'relative', color: 'black', top: '20px' }} className='col-md-6'>
                                                <p>{bankData[0].accountNumber}</p>
                                            </div>
                                        </div>
                                        <div className='row mt-3'>
                                            <div style={{ position: 'relative', color: 'black', top: '20px' }} className='col-md-6'>
                                                <label>Balance</label>
                                            </div>
                                            <div style={{ position: 'relative', color: 'black', top: '20px' }} className='col-md-6'>
                                                <p>{bankData[0].balance}</p>
                                            </div>
                                        </div>


                                    </div>

                                </div>
                            </div>
                        </div>


                    </div>

                </div>
            }</>

        )
    }




}

export default Bank