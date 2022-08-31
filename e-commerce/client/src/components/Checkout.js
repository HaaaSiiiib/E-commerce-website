import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

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
    localStorage.setItem("price", data.price)
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
    const isProduct = localStorage.getItem("items")
    if ( !isProduct) {
      window.alert("Add a product to your cart first");
    }
    else {
      localStorage.setItem("shippingaddress", shippingData);
      localStorage.setItem("transactionId", shippingData.transactionId);
      localStorage.setItem("transactionAmount", shippingData.transactionAmount);
      localStorage.setItem("location", shippingData.shippingAddress);
      localStorage.setItem("ordertime", shippingData.createdAt);


      console.log(localStorage.getItem('shippingaddress'));
    }
  }

  useEffect(() => {
    callShippingAddress();

  }, []);









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
          <div className='orders pb-5'>

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

          <div className='price pb-5'>
            <h3> Total Price : {localStorage.getItem('price')} TK </h3>
          </div>

          <h1 className='heading pb-4' style={{ color: 'Black' }}>
            Shipping Address :
          </h1>
          <div className='shipping '>
            <form mothod="POST" className="address-form" id="address-form">

              <div className="input-container">
                <i style={{ position: 'relative', color: 'black', top: '10px', left: '180px' }} className="fa fa-map-marker fa-3x"></i>
                <input className="input-field" style={{ height: '60px', width: '700px', left: '210px', color: 'white', fontFamily: 'cursive', fontWeight: "bolder", fontSize: '25px' }} type="text"
                  value={shippingAddress}
                  onChange={(e) => setShippingAdrdess(e.target.value)} placeholder="Enter Your Address" name="shippingAddress" />
              </div>


              <button style={{ borderRadius: '30px', fontSize: '20px', border: 'black', fontWeight: 'bold', position: 'relative', top: '10px', left: '240px', width: '100px', height: '40px' }}
                type="submit" name='signin' id='signin' class="btn btn-primary mb-5" onClick={callShippingAddress}>Done</button>
            </form>



          </div>

          <button style={{ borderRadius: '30px', fontSize: '20px', border: 'black', fontWeight: 'bold', position: 'relative', top: '120px', left: '740px', width: '300px', height: '50px' }}
                type="submit" name='signin' id='signin' class="btn btn-primary mb-5"><Link to="/ordersuccess" style={{ color: 'white' }}>Confirm Order </Link></button>


        </div>
      }
    </>
  )
}

export default Checkout