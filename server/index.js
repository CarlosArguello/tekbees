const cors = require('cors')
const express = require("express")
const app = express()

const clientRouter = require("./router/clientRouter")
const productRouter = require("./router/productRouter")
const invoceRouter = require("./router/invoceRouter")
const port = 5000

app.use(cors())
app.use(express.json())
app.use("/client", clientRouter)
app.use("/product", productRouter)
app.use("/invoce", invoceRouter)

app.listen(port, ()=> {
    console.log("Server is ready")
})