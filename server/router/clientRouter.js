const express = require("express")
const router = express.Router()

const db = require("../config/db")

db.connect((err)=>{
    if(!err) console.log("db connected")
})

router.post("/", async (req, res)=> {
    const { docTypeId, doc, fullName, email, address, city } = req.body
    
    try{
        const result = await db.promise().execute("INSERT INTO client(docTypeId, doc, fullName, email, address, city) values(?,?,?,?,?,?)", [
            docTypeId, doc, fullName, email, address, city
        ])
        
        if(result[0].affectedRows == 1)
            return res.sendStatus(200)
        
        
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})

module.exports = router