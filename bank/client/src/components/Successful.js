import React from 'react'
import Signup from '../components/Signup'

const Successful = () => {



  return (
      <div className='successful'>

    <p style={{ color: "white" ,position : 'relative', top: '150px',fontWeight:"bolder", left:'100px',fontSize:"40px"}} className='registration'>Registration Successful</p>
    <h2  style={{ color: "white",color:'white',position:'relative', top: '250px', left:'110px', fontWeight:"bold",fontSize:"30px" }}> Account Number : {localStorage.getItem('accNum')}</h2>
        
    </div>
  )
  
}

export default Successful