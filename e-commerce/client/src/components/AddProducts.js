import React from 'react'
import { NavLink } from 'react-router-dom'

const AddProducts = () => {
  return (
    <div style={{position : 'relative', top:'0px',backgroundImage: 'url("https://www.completechaintech.com/sites/default/files/2022-03/difference_between_websites_and_ecommerce.jpeg")', 
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height:'900px'
    

}}  className='creat-product pt-5 ps-5'>
        <h1 style={{ color: "white", fontWeight:"bolder", fontSize :'70px' }}>Create your own product</h1>
        <div className='col pt-5 ms-5 ps-5 sm-6 offset sm-3'>
            <br/>
            <div style={{ color: "white", fontWeight:"bolder",  }}className='Product-name pb-5' > 
                <h3>Product Name</h3>           
                <input type="text" className='form control' placeholder='Name'/><br/>
            </div>
            <div style={{ color: "white", fontWeight:"bolder",  }}className='Product-name pb-5' > 
                <h3>Upload Image</h3>           
                <input type="file" className='form control' placeholder='Image File'/><br/>
            </div>           
            <div style={{ color: "white", fontWeight:"bolder",  }}className='Product-name pb-5' > 
                <h3>Price</h3>           
                <input type="text" className='form control' placeholder='Price'/><br/>
            </div>
            <button style={{ position:'relative', color: "white",left:'500px', fontWeight:"bolder",  }}className='btn btn-primary'>
            <NavLink to="/products" className="add-product-link" style={{color:'white'}} >Add Product</NavLink>
            </button>
            
        </div>
        
    </div>
  )
}

export default AddProducts