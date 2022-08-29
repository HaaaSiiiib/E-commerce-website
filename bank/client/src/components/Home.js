import React from 'react'

const Home = () => {
    return(

        <div style={{backgroundImage: 'url("https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmFua3xlbnwwfHwwfHw%3D&w=1000&q=80")', 
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                height: '900px'
                
        
        }} className='home-page'>
            <div className='home-div'>

            <p style={{ color: "white" ,position : 'relative', top: '550px',fontWeight:"bolder", left:'100px',fontSize:"80px"}} className='pt-5'>Greetings</p>
            <h1  style={{ color: "white",color:'white',position:'relative', top: '550px', left:'110px', fontWeight:"bold",fontSize:"50px" }}>From the Bank of Akhalia</h1>
                
            </div>

        </div>
    )
}

export default Home