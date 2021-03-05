const express = require("express")
const router = express.Router()

const db = require("../config/db")

db.connect((err)=>{
    if(!err) console.log("db connected")
})


router.post("/", async (req, res)=> {
    const { client, products } = req.body
    console.log(client, products)
    const { typeDoc, doc, fullName, email, address, city } = client
    
    try{
        const result = await db.promise().execute("INSERT INTO client(docTypeId, doc, fullName, email, address, city) values(?,?,?,?,?,?)", [
            typeDoc, doc, fullName, email, address, city
        ])
        
        if(result[0].affectedRows == 1){

            for(index in products){
                const product = products[index]
                await db.promise().execute("UPDATE products SET stock = stock - ? where id = ?", [ product.qty, product.id ])
                await db.promise().execute("INSERT INTO invoce(productId, clientId, qty) values(?,?,?)", [ product.id, result[0].insertId, product.qty ])
            }


            return res.sendStatus(200)
        }
        
        
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})

module.exports = router