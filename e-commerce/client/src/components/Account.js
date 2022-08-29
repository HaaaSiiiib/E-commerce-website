import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
//import Transaction from './Transaction';
//import transactionData from './Transaction'

const About = () => {

    const history = useHistory();
    const [data, setUserData] = useState();
    const [isLoading, setIsLoading] = useState(false)


    const callAbout = async () => {
        try {
            const id = localStorage.getItem('id');
            const session = localStorage.getItem('session');
            const res = await fetch('https://ecom.cse446.ml/api/v1/users/' + id, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer ' + session
                },
            });

            if(res.status != 200) {
                history.push('/login');
            }

            const data1 = await res.json();
            console.log(data1);
            setUserData(data1);
            //console.log(userData);
            //console.log(data1);

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



        <> {(isLoading || !data) && <div>Loading...</div>}
            {!isLoading && data &&
                <div className="container emp-profile">
                    <div>
                        <div className="row">
                            <div className="col-md-4">
                                <img style={{ position: 'relative', height: '200px', top: '20px', left: '100px', width: '200px' }} src={'https://cdn-icons-png.flaticon.com/512/64/64572.png'} />
                            </div>

                            <div className="col-md-6">
                                <div className="profiel-head">
                                    <h5 style={{ position: 'relative', color: 'white', top: '20px' }}>{data.name}</h5>
                                    <h6 style={{ position: 'relative', color: 'white', top: '20px' }}>{data.email}</h6>

                                    <ul className="nav nav-tabs">
                                        <li className="nav-item" role="tablist">
                                            <a className="nav-link mt-5 " style={{ color: 'gray', top: '20px' }} id='about-tab' data-toggle="tab" href="#about" role="tab" aria-controls="about" aria-selected='about'>About</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link mt-5" style={{ color: 'gray', top: '20px' }} id='orderHistory-tab' data-toggle="tab" href="#orderHistory" role="tab" aria-controls="orderHistory" aria-selected='orderHistory' >Order History</a>
                                        </li>
                                    </ul>

                                </div>

                            </div>

                            <div style={{ position: 'relative', left: '-150px', top: '20px' }} className='col-md-2'>
                                <input type="submit" className="profil-edit-btn" name='btnAddMore' value="Log out" 
                                onClick={()=>{localStorage.removeItem('session'); location.reload()}}
                                />
                            </div>

                      



                            <div style={{ position: 'relative', left: '175px', top: '20px' }} className='col-md-8 pl-5 about-info'>
                                <div className="tab-content" id="myTabcontent">


                                    <div className='tab-pane fade show active' id="about" role="tabpanel" aria-labelledby="about-tab">

                                        <div className='row mt-3'>
                                            <div style={{ position: 'relative', color: 'black', top: '20px' }} className='col-md-6'>
                                                <label >Name</label>
                                            </div>
                                            <div style={{ position: 'relative', color: 'black', top: '20px' }} className='col-md-6'>
                                                <p>{data.name}</p>
                                            </div>
                                        </div>
                                        <div className='row mt-3'>
                                            <div style={{ position: 'relative', color: 'black', top: '20px' }} className='col-md-6'>
                                                <label>Email</label>
                                            </div>
                                            <div style={{ position: 'relative', color: 'black', top: '20px' }} className='col-md-6'>
                                                <p>{data.email}</p>
                                            </div>
                                        </div>
                                        <div className='row mt-3'>
                                            <div style={{ position: 'relative', color: 'black', top: '20px' }} className='col-md-6'>
                                                <label>phone</label>
                                            </div>
                                            <div style={{ position: 'relative', color: 'black', top: '20px' }} className='col-md-6'>
                                                <p>{data.phone}</p>
                                            </div>
                                        </div>
                                        <div className='row mt-3'>
                                            <div style={{ position: 'relative', color: 'black', top: '20px' }} className='col-md-6'>
                                                <label>Address</label>
                                            </div>
                                            <div style={{ position: 'relative', color: 'black', top: '20px' }} className='col-md-6'>
                                                <p>{data.address}</p>
                                            </div>
                                        </div>

                                    </div>

                                    <div className='tab-pane fade' id="orderHistory" role="tabpanel" aria-labelledby="orderHistory-tab">
                                        <div className="row">
                                            
                                            <div style={{ position: 'relative', color: 'black', top: '20px' }} className='col-md-6'>

                                                <p>{data.orders[0] && data.orders[0].transactionId}</p>
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