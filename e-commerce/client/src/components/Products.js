import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Products = () => {

    const history=useHistory();
    const [data, setData]= useState('');
    const [isLoading, setIsLoading] = useState(false)


    const callproducts = async (e) =>{

        const res = await fetch(' https://ecom.cse446.ml/api/v1/products', {
            method :"GET",
            headers: {
                "Content-Type" : "application/json",
                "Accept": "applocation/json",
                "Authorization":"Bearer "+localStorage.getItem("session")
            },
           
        });
        if(res.status != 200) {
            history.push('/login');
        }

        const data = await res.json();
        localStorage.setItem("products",JSON.stringify(data)); 
        console.log(data);
        setData(data);
    }

    useEffect(() => {
        setIsLoading(true);
        callproducts();
        setIsLoading(false);

    }, []);
    


    const addProduct0 = async ()=>{

        const res = await fetch('https://ecom.cse446.ml/api/v1/carts', {
            method :"POST",
            headers: {
                "Content-Type" : "application/json",
                "Accept": "applocation/json",
                "Authorization":"Bearer "+localStorage.getItem("session")
            },
            body:JSON.stringify( {
                productId :data[0].id,
                amount : 1
            })
           
        });
        window.alert("Product Added Successfully")

    }
    const addProduct1 = async()=>{
        const res = await fetch('https://ecom.cse446.ml/api/v1/carts', {
            method :"POST",
            headers: {
                "Content-Type" : "application/json",
                "Accept": "applocation/json",
                "Authorization":"Bearer "+localStorage.getItem("session")
            },
            body:JSON.stringify( {
                productId :data[1].id,
                amount : 1
            })
           
        });


        window.alert("Product Added Successfully")

        
    }
    const addProduct2 = async ()=>{
        const res = await fetch('https://ecom.cse446.ml/api/v1/carts', {
            method :"POST",
            headers: {
                "Content-Type" : "application/json",
                "Accept": "applocation/json",
                "Authorization":"Bearer "+localStorage.getItem("session")
            },
            body:JSON.stringify( {
                productId :data[2].id,
                amount : 1
            })

           
        });

        window.alert("Product Added Successfully")
        
    }


    // const [data, setData] = useState([]);
    // useEffect(async () => {
    //     let results = await fetch("https://ecom.cse446.ml/api/v1/products");
    //     results = await results.json();
    //     setData(results)
    // }, [])

    // console.warn("results", data)


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
                Products
            </h1>
            <Card style={{  width: '18rem', left: '120px'  }}>
                <Card.Img variant="top" src={data[0].imgUrl}/>
                <Card.Body>
                    <Card.Title>{data[0].name}</Card.Title>
                    <Card.Text>
                        Price {data[0].price} Taka
                    </Card.Text>
                    <div>                 
                        <Button onClick={addProduct0}>Add To Cart</Button>
                    </div>
                </Card.Body>
            </Card>

            <Card style={{  width: '18rem' , left: '240px' }}>
                <Card.Img variant="top" src={data[1].imgUrl}/>
                <Card.Body>
                    <Card.Title>{data[1].name}</Card.Title>
                    <Card.Text>
                        Price {data[1].price} Taka
                    </Card.Text>
                    <div>                 
                        <Button onClick={addProduct1}>Add To Cart</Button>
                    </div>
                </Card.Body>
            </Card>

            <Card style={{  width: '18rem',  left: '360px'}}>
                <Card.Img variant="top" src={data[2].imgUrl}/>
                <Card.Body>
                    <Card.Title>{data[2].name}</Card.Title>
                    <Card.Text>
                        Price {data[2].price} Taka
                    </Card.Text>
                    <div>                 
                        <Button onClick={addProduct2}>Add To Cart</Button>
                    </div>
                </Card.Body>
            </Card>

        </div>
    }
    </>

    )

}

export default Products