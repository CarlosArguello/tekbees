import React, { useState } from "react"

const CardProduct = ({ id, barCode = "lllllllll", name = "test", price = 0, stock = 10, category = "test", buyProduct }) => {

    const [ qtyBuy, setQtyBuy ] = useState(0)
    const changeQtyBuy = (qty) => {
        if(qty <= stock && qty >= 0){
            setQtyBuy(qty)
        }
    }

    return(
        <div className="rounded-lg pt-2 px-4 pb-4 shadow-md border relative">
            <div className="border-b py-2">

                <p className="absolute top-0 right-0 mt-2 mr-4 font-bold text-green-500">{ category }</p>
                <p className="text-xl font-bold text-center">{ name }</p>
            </div>

            <div className="flex flex-col items-center my-4">

                <img src="/assets/img/barcode.png" className="h-16"/>
                <p className="text-xs mt-2 text-center ">{ barCode }</p>
            </div>
            
            <div className="flex justify-between text-base pt-2 pb-6">
                <p className="font-bold">
                    <strong>Precio: </strong> ${ price }
                </p>
                <p>
                <strong>Cant. disponible: </strong> { stock - qtyBuy }
                </p>
            </div>

            <div className="flex justify-center space-x-6">
                <button 
                    onClick={ ()=> changeQtyBuy(qtyBuy-1) }
                    className="bg-white p-2 border w-12 text-base font-bold rounded-md"
                >
                    <i class="fas fa-minus"></i>
                </button>

                <button 
                    onClick={ ()=> buyProduct({ id, qty: qtyBuy })}
                    className="bg-green-500	text-white w-2/4 p-2 text-base font-bold rounded-md">
                    <i class="fas fa-cart-plus mr-2"></i>
                    { qtyBuy==0?"Agregar":qtyBuy }
                </button>

                <button 
                    onClick={ ()=> changeQtyBuy(qtyBuy+1) }
                    className="bg-white p-2 border w-12 text-base font-bold rounded-md">
                    <i class="fas fa-plus"></i>
                </button>
            </div>


        </div>
    )
}

export default CardProduct