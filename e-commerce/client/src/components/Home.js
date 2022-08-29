import React from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => {
    return (

        <div style={{
            backgroundImage: 'url("https://www.completechaintech.com/sites/default/files/2022-03/difference_between_websites_and_ecommerce.jpeg")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: '900px',
            maxWidth: 'fit-window'


        }} className='home-page'>
            <div className='home-div'>

                <p style={{ color: "White", position: 'relative', top: '50px', fontWeight: "bolder", left: '100px', fontSize: "80px" }} className='pt-5'>Welcome to SustCart</p>
                <h1 style={{ color: "white", color: 'white', position: 'relative', top: '50px', left: '110px', fontWeight: "bold", fontSize: "50px" }}> Your favorite online shopping site</h1>
                <button color={{}} style={{ color: "white", borderRadius: '30px', fontSize: '25px', border: 'black', top: "70px", fontWeight: 'bold', position: 'relative', left: '125px', width: '300px', height: '50px' }}
                    type="submit" name='shop' id='shop' class="btn btn-primary mt-5 ">
                    <NavLink to="/products" className="shop-now-link" style={{ color: 'white' }}>Shop Now</NavLink></button>


                <button color={{}} style={{ color: "white", borderRadius: '30px', fontSize: '20px', border: 'black', top: "170px", fontWeight: 'bold', position: 'relative', left: '-175px', width: '300px', height: '50px' }}
                    type="submit" name='shop' id='shop' class="btn btn-primary mt-5 ">
                    <NavLink to="/addProducts" className="shop-now-link" style={{ color: 'white' }}>Add your product</NavLink></button>



            </div>

        </div>
    )
}

export default Home