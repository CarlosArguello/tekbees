const mysql = require("mysql2")


module.exports = mysql.createConnection({
    host: "localhost",
    port: 3308,
    user: "test",
    password: "12345678",
    database: "tekbees"
})