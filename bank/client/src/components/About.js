import React, { useEffect, useState } from 'react'
import demopic from "../images/scotland-logo.png"
import { useHistory } from 'react-router-dom';
//import Transaction from './Transaction';
//import transactionData from './Transaction'

const About = () => {

    const history = useHistory();
    const [data, setUserData] = useState();
    const [isLoading, setIsLoading] = useState(false)


    const callAbout = async () => {
        try {
            const accNum = localStorage.getItem('accNum');
            const session = localStorage.getItem('session');
            const res = await fetch('https://bank.cse446.ml/api/v1/accounts/' + accNum, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer ' + session
                },
            });

            const data1 = await res.json();
            console.log(data1);
            setUserData(data1);
            //console.log(userData);
            console.log(data1);

            // if (!res.status === 200) {
            //     const error = new Error(res.error);
            //     throw error();
            // }


        } catch (err) {
            console.log(err);
            history.push('/login')

        }
    }

    useEffect(() => {
        setIsLoading(true)
        callAbout();
        setIsLoading(false);

    }, []);

    return (
    

        
           <> {(isLoading || !data)&& <div>Loading...</div>}
            {!isLoading && data &&
            <div className="container emp-profile">
                    <div>
                        <div className="row">
                            <div className="col-md-4">
                                <img style={{ position: 'relative', height: '200px', top: '20px', left: '200px', width: '200px' }} src={demopic} alt="scott" />
                            </div>

                            <div className="col-md-6">
                                <div className="profiel-head">
                                    <h5 style={{ position: 'relative', color: 'white', top: '20px' }}>{data[0].name}</h5>
                                    <h6 style={{ position: 'relative', color: 'white', top: '20px' }}>{data[0].email}</h6>


                                    <ul className="nav nav-tabs">
                                        <li className="nav-item" role="tablist">
                                            <a className="nav-link mt-5 " style={{ color: 'gray', top: '20px' }} id='about-tab' data-toggle="tab" href="#about" role="tab" aria-controls="about" aria-selected='home'>About</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link mt-5" style={{ color: 'gray', top: '20px' }} id='transaction-tab' data-toggle="tab" href="#transaction" role="tab" aria-controls="transaction" aria-selected='transaction' >Transaction</a>
                                        </li>
                                    </ul>
                                </div>

                            </div>



                            <div style={{ position: 'relative', left: '-150px', top: '20px' }} className='col-md-2'>
                                <input type="submit" className="profil-edit-btn" name='btnAddMore' value="Edit Profile" />
                            </div>



                            <div style={{ position: 'relative', left: '175px', top: '20px' }} className='col-md-8 pl-5 about-info'>
                                <div className="tab-content" id="myTabcontent">
                                    <div className='tab-pane fade show active' id="about" role="tabpanel" aria-labelledby="about-tab">
                                        <div className="row">
                                            <div style={{ position: 'relative', color: 'white', top: '20px' }} className='col-md-6'>
                                                <label >Account Number</label>
                                            </div>
                                            <div style={{ position: 'relative', color: 'white', top: '20px' }} className='col-md-6'>
                                                <p>{data[0].accountNumber}</p>
                                            </div>
                                        </div>
                                        <div className='row mt-3'>
                                            <div style={{ position: 'relative', color: 'white', top: '20px' }} className='col-md-6'>
                                                <label>Balance</label>
                                            </div>
                                            <div style={{ position: 'relative', color: 'white', top: '20px' }} className='col-md-6'>
                                                <p>{data[0].balance}</p>
                                            </div>
                                        </div>
                                        <div className='row mt-3'>
                                            <div style={{ position: 'relative', color: 'white', top: '20px' }} className='col-md-6'>
                                                <label >Name</label>
                                            </div>
                                            <div style={{ position: 'relative', color: 'white', top: '20px' }} className='col-md-6'>
                                                <p>{data[0].name}</p>
                                            </div>
                                        </div>
                                        <div className='row mt-3'>
                                            <div style={{ position: 'relative', color: 'white', top: '20px' }} className='col-md-6'>
                                                <label>phone</label>
                                            </div>
                                            <div style={{ position: 'relative', color: 'white', top: '20px' }} className='col-md-6'>
                                                <p>{data[0].phone}</p>
                                            </div>
                                        </div>
                                        <div className='row mt-3'>
                                            <div style={{ position: 'relative', color: 'white', top: '20px' }} className='col-md-6'>
                                                <label>Address</label>
                                            </div>
                                            <div style={{ position: 'relative', color: 'white', top: '20px' }} className='col-md-6'>
                                                <p>{data[0].address}</p>
                                            </div>
                                        </div>
                                        
                                    </div>





                                    <div className='tab-pane fade' id="transaction" role="tabpanel" aria-labelledby="transaction-tab">
                                        <div className="row">
                                            <div style={{ position: 'relative', color: 'white', top: '20px' }} className='col-md-6'>
                                                <label >DEBIT</label>
                                            </div>
                                            <div style={{ position: 'relative', color: 'white', top: '20px' }} className='col-md-6'>
                                                <p>{}</p>
                                            </div>
                                        </div>
                                        <div className='row mt-3'>
                                            <div style={{ position: 'relative', color: 'white', top: '20px' }} className='col-md-6'>
                                                <label >Balance</label>
                                            </div>
                                            <div style={{ position: 'relative', color: 'white', top: '20px' }} className='col-md-6'>
                                                <p>{ }</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    {/* <button style={{ borderRadius: '30px', fontSize: '20px', border: 'black', fontWeight: 'bold', position: 'relative', left: '165px', width: '200px', height: '50px' }}
                        type="submit" name='signup' id='signup' class="btn btn-primary mt-5" onClick={history.push('/transaction')} >Go to Transaction</button> */}

                </div>}

        </>

        //<></>
    )





}

export default About