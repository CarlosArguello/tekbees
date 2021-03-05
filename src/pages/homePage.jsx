import React, { useState, useEffect } from "react"

import axios from "axios"

import Container from "../components/layouts/container"
import CardProduct from "../components/cardProduct"
import ButtonCart from "../components/buttonCart"
import FinishBuy from "../components/finishBuy"

const HomePage = () => {

    const 
        [ products, setProduct ] = useState([]),
        [ productsInCart, setProductsInCart  ] = useState([]),
        [ qtyProductsInCart,setQtyProductsInCart ] = useState(0),
        [ isFinishBuy, setIsFinishBuy ] = useState(false)

    const addProductToCart = ({ id, qty }) => {
        
        const index = productsInCart?.findIndex( (product) => product.id == id )
        if(index != -1){
            productsInCart.splice(index, 1)
        }

        setProductsInCart(
            productsInCart.concat({ id, qty })
        )
    }

    useEffect(()=>{
        const qtyProducts = productsInCart?.map(({ qty}) => qty)
        setQtyProductsInCart(
            qtyProducts.reduce((a, b) => a + b, 0)
        )
    }, [ productsInCart ])

    useEffect(()=>{
        axios.get("http://localhost:5000/product").then( ({ status, statusText, data}) => {
            if(status == 200 && statusText == "OK"){
                console.log(data)
                setProduct(data)
            }
        })
    },[])

    if(!products.length) return <h1 className="text-5xl text-center my-16">Registra un producto</h1>

    return(
        <Container>
            <h1 className="text-4xl font-bold text-center">Tekbees test</h1>
            <div className="grid grid-cols-4 gap-8 py-16">
                {
                    products.map( product => (
                        <CardProduct 
                            { ...product }
                            buyProduct={ addProductToCart }
                        />
                    ))
                }
            </div>
            {
                !!productsInCart.length?(
                    <ButtonCart 
                        qty={ qtyProductsInCart }
                        handle={ ()=> { setIsFinishBuy(true) } } 
                    />
                ):null
            }
            <FinishBuy 
                isOpen={ isFinishBuy }
                onClose={ ()=>{ setIsFinishBuy(false) } }
                products={ productsInCart }
            />
        </Container>
    )
}

export default HomePage