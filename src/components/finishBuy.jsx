import React, { useState } from "react"

import axios from "axios"
import Swal from 'sweetalert2/dist/sweetalert2.js'

import Modal from "./layouts/modal"

const FinishBuy = ({ isOpen, onClose, products })=> {
    const [ typeDoc, setTypeDoc ] = useState("")
    const [ doc, setDoc ] = useState("")
    const [ fullName, setFullName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ address, setAddress ] = useState("")
    const [ city, setCity ] = useState("")

    const handleBuy = async (event)=>{
        event.preventDefault()

        const { status, statusText } = await axios.post("http://localhost:5000/invoce", {
            client:{
                typeDoc,
                doc,
                fullName,
                email,
                address,
                city
            },
            products
        })

        if(status == 200 && statusText == "OK"){
            Swal.fire({
                title: "Compra finalizada.",
                text: `Sr. ${ fullName?.split(" ")[0] } gracias por la compra`

            })
            setTimeout(()=>{
                window.location.reload()
            }, 2000)
        }

    }

    return(
        <Modal
            isOpen={ isOpen }
            onClose={ onClose }
        >
            <form className="space-y-4 p-6" onSubmit={ handleBuy }>
                <div className="flex space-x-6">
                    <div className="w-1/3">
                        <CustomInput 
                            label="Tipo doc." 
                            onChange={ ({ target })=> setTypeDoc(target.value) }
                            value={ typeDoc }
                        />
                    </div>
                    <CustomInput 
                        label="Nro. documento"
                        onChange={ ({ target })=> setDoc(target.value) }
                        value={ doc }
                    />
                </div>

                <CustomInput 
                    label="Nombre completo"
                    onChange={ ({ target })=> setFullName(target.value) }
                    value={ fullName }
                />
                <CustomInput label="Email" />

                <div className="flex space-x-6 pb-4">
                    <CustomInput 
                        label="Dirección"
                        onChange={ ({ target })=> setAddress(target.value) }
                        value={ address }
                    />
                    <div className="w-1/3">
                        <CustomInput 
                            label="Ciudad" 
                            onChange={ ({ target })=> setCity(target.value) }
                            value={ city }
                        />
                    </div>
                </div>

                <button 
                    type="submit"
                    className="bg-green-500	text-white w-2/4 px-2 py-4 text-base font-bold rounded-md mx-auto block"
                >Finalizar compra</button>
            </form>
        </Modal>
    )
}
/*
docTypeId, doc, fullName, email, address, city*/

const CustomInput = ({ label, type, ...props}) => (
    <div className="flex flex-col w-full">
        <label className="text-sm font-bold text-gray-600 mb-2">{ label }</label>
        <input 
            type={ type } 
            { ...props }
            className="px-4 h-12 border rounded-md"
            style={{ outline: "none" }}
        />
    </div>
)

export default FinishBuy