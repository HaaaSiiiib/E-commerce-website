import React from 'react'
import { Card } from 'react-bootstrap'

const OrderSuccess = () => {
    return (
        <div className='successful'>

            <p style={{ color: "Green", position: 'relative', top: '150px', fontWeight: "bolder", left: '100px', fontSize: "40px" }} className='registration'>Order Successful!</p>
          

            <Card style={{ width: '38rem', left: '120px' , top: "180px"}}>

                {/* <Card.Img variant="top" src={data[0].imgUrl }/> */}
                <Card.Body>
                    <Card.Title> Transaction Id : {localStorage.getItem('transactionId')}</Card.Title>
                    <Card.Title> Cost : {localStorage.getItem('transactionAmount')} TK</Card.Title>
                    <Card.Text>
                        Location : {localStorage.getItem('location')}
                    </Card.Text>
                    <Card.Text>
                        Ordered at : {localStorage.getItem('ordertime')}        
                    </Card.Text>

                </Card.Body>


            </Card>


        </div>)
}

export default OrderSuccess