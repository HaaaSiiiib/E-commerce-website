import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useHistory } from 'react-router-dom';

const Checkout = () => {

  const [shippingAddress, setShippingAdrdess] = useState();
  const [billingData, setbillingData] = useState();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)


  const callCheckout = async (e) => {

    const res = await fetch('https://ecom.cse446.ml/api/v1/carts/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "applocation/json",
        "Authorization": "Bearer " + localStorage.getItem("session")
      },

    });

    const data = await res.json();
    localStorage.setItem("items", JSON.stringify(data));
    console.log("bug", data);
    setData(data.items);
  }

  useEffect(() => {
    setIsLoading(true);
    callCheckout();
    setIsLoading(false);

  }, []);



  const callShippingAddress = async (e) => {

    e.preventDefault();


    const res2 = await fetch('https://ecom.cse446.ml/api/v1/orders', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "applocation/json",
        "Authorization": "Bearer " + localStorage.getItem("session")
      },
      body: JSON.stringify({
        shippingAddress
      })

    });

    const shippingData = await res2.json();
    console.log(shippingData)
    localStorage.setItem("shippingaddress", shippingData);
    console.log(localStorage.getItem('shippingaddress'));
  }

  useEffect(() => {
    callShippingAddress();

  }, []);




  // const callCheckoutBilling = async (e) => {

  //   const res = await fetch('https://ecom.cse446.ml/api/v1/carts/', {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "applocation/json",
  //       "Authorization": "Bearer " + localStorage.getItem("session")
  //     },

  //   });

  //   const billingData = await res.json();
  //   localStorage.setItem("items", JSON.stringify(billingData));
  //   console.log("bug", data);
  //   setData(billingData.items);
  // }

  // useEffect(() => {
  //   setIsLoading(true);
  //   callCheckoutBilling();
  //   setIsLoading(false);

  // }, []);










  return (

    <>
      {(isLoading || !data) && <div>Loading...</div>}
      {!isLoading && data &&

        <div className='row ps-5 pt-5' /*style={{
      backgroundImage: 'url("https://www.completechaintech.com/sites/default/files/2022-03/difference_between_websites_and_ecommerce.jpeg")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      height: '900px',
      maxWidth: 'fit-window'


  }}*/ >
          <h1 className='heading pb-5 ps-5' style={{ color: 'Black' }}>
            Your Order
          </h1>
          <div className='orders mb-5 pb-5'>

            {data.map((item, key) => <Card style={{ width: '68rem', left: '120px' }}>

              {/* <Card.Img variant="top" src={data[0].imgUrl }/> */}
              <Card.Body>
                <Card.Title> Product Id : {item.productId}</Card.Title>
                <Card.Title> Amount : {item.amount}</Card.Title>
                <Card.Text>
                  Ordered at : {item.createdAt}
                </Card.Text>
                <Card.Text>
                  Price {item.price} Taka
                </Card.Text>

              </Card.Body>


            </Card>


            )}
          </div>

          <h1 className='heading pb-4' style={{ color: 'Black' }}>
            Shipping Address :
          </h1>
          <div className='shipping '>
              <form mothod="POST" className="address-form" id="address-form">

                <div className="input-container">
                  <i style={{ position: 'relative',color :'black', top:'18px', left: '130px'}} className="fa fa-map-marker fa-4x"></i>
                  <input className="input-field" style={{ height:'120px', width:'700px', top:'-70px', left:'210px', color: 'white', fontFamily: 'cursive', fontWeight: "bolder", fontSize: '25px' }} type="text"
                    value={shippingAddress}
                    onChange={(e) => setShippingAdrdess(e.target.value)} placeholder="Enter Your Address" name="shippingAddress" />
                </div>


                <button style={{ borderRadius: '30px', fontSize: '20px', border: 'black', fontWeight: 'bold', position: 'relative', top:'-50px' ,left: '210px', width: '200px', height: '50px' }}
                                        type="submit" name='signin' id='signin' class="btn btn-primary mb-5" onClick={callShippingAddress} >Confirm</button>
              </form>
         


          </div>




          <h1 className='heading pb-5' style={{ color: 'Black' }}>
            Billing Details :
          </h1>


        </div>
      }
    </>
  )
}

export default Checkout