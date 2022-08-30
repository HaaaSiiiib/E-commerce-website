import React, { useState, useEffect } from "react";
import '../App.css'
import { Table } from 'react-bootstrap';
import { Link } from "react-router-dom";


const Cart = () => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)


  const callCart = async (e) => {

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
    callCart();
    setIsLoading(false);

  }, []);



  return (<>

    {(isLoading || !data) && <div className="empty-or-null cart ms-5 ps-5 pt-5"><h2 className="heading pb-5"> Cart Items </h2>

      <div className="empty-msg ms-5 ps-5 pt-5"> <h5> Your Cart is empty </h5></div> </div>}
    {!isLoading && data &&



      <div className="cart-body ms-5 ps-5 pt-5" >
        <h2 > Cart Items </h2>

        <div> <h5> Your Cart is empty </h5></div>
        <Table>

          <div className="header-row ms- mb-5 mt-5 ps-5">
            <tr>
              <td style={{ fontWeight: 'bold', width: '400px', height: '80px' }}>productName</td>

              <td style={{ fontWeight: 'bold', width: '400px', height: '80px' }}>amount</td>

              <td style={{ fontWeight: 'bold', width: '500px', height: '80px' }}>price</td>
            </tr>
          </div>

          {data.map((item, key) => <div className="first-row ms- mb-5 mt-5 ps-5">
            <tr >
              <td style={{ fontWeight: 'bold', width: '400px', height: '80px' }}>{item.productId}</td>

              <td style={{ fontWeight: 'bold', width: '400px', height: '80px' }}>{item.amount}</td>

              <td style={{ fontWeight: 'bold', width: '400px', height: '80px' }}>{item.price}</td>
              <td><button style={{ borderRadius: '10px', fontSize: '16px', border: "shadow", position: 'relative', width: '80px', height: '50px' }}
                type="submit" value="Delete Row" >Remove</button></td>

            </tr>
          </div>)}

          {/* <div className="first-row ms- mb-5 mt-5 ps-5">
          <tr>
            <td style={{ fontWeight:'bold', width: '400px', height:'80px' }}>productName</td>

            <td style={{ fontWeight:'bold', width: '400px', height:'80px' }}>amount</td>

            <td style={{ fontWeight:'bold', width: '400px', height:'80px' }}>price</td>
            <td><button style={{borderRadius:'10px',fontSize:'16px',border:"shadow" ,position:'relative', width:'80px',height:'50px'}} type="submit" value="Delete Row" onclick={RemoveRow}>Remove</button></td>

          </tr>
        </div> */}

        </Table>
      </div>

    /* {cart((item) => ( 
        <div className="row" >
          
            <img src='{item.img}' alt="" /> 
            productName
          
          
             <button onClick={() => handleChange(item, 1)}>+</button> 
            <div><button>1</button></div>
            <button onClick={() => handleChange(item, -1)}>-</button> 
          
         
            <p>price</p>
            <button onClick={() => handleRemove(item.id)}>Remove</button> 
          
        </div>
      
      <div className="total">
        <span>Total Price of your Cart</span>
        <span> Taka - 100</span>
      </div> */}
    <div>

      <button color={{}} style={{ color: "white", borderRadius: '30px', fontSize: '20px', border: 'black', fontWeight: 'bold', position: 'relative', left: '600px', width: '300px', height: '50px' }}
        type="submit" name='shop' id='shop' className="btn btn-primary mt-5"><Link to="/checkout" style={{ color: 'white' }}>Go to Checkout </Link></button>
    </div>

  </>
  );
};

export default Cart;