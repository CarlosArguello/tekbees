const express = require("express")
const router = express.Router()

const db = require("../config/db")

db.connect((err)=>{
    if(!err) console.log("db connected")
})

router.get("/", async (req, res)=> {
    try{
        const [ result ] = await db.promise().query("select * from products")  
        res.status(200).json(result)
    }catch(err){
        res.sendStatus(500)
    }

})

router.post("/", async (req, res)=> {
    const { barCode, name, price, stock, category } = req.body
    
    try{
        const [ result ] = await db.promise().query("select id from categories where name = ? limit 1", [ category ])


        let categoryId;

        if(typeof result[0] == "undefined"){
            const resultCategory = await db.promise().query("insert into categories set ?", { name: category })
            console.log(resultCategory)
            categoryId = resultCategory[0].insertId
        }else{
            categoryId = result[0].id
        }


        const resultProduct = await db.promise().execute("INSERT INTO products(barCode, name, price, stock, categoryId) values(?,?,?,?,?)", [
            barCode, name, price, stock, categoryId
        ])

        if(resultProduct[0].affectedRows == 1)
            return res.sendStatus(200)
        
        
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})

router.put("/:id", async (req, res) => {
    const { id } = req.params
    try{

    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})

router.delete("/:id", async (req, res)=> {
    const { id } = req.params
    try{
        const result = await db.promise().query("delete from products where id = ? limit 1" [ id ])
        console.log(result)
 
        res.sendStatus(200)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})

module.exports = router