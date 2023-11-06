const connect = require("./schemas");
const express = require("express");
const products = require("./routes/products.router")
const app = express();
const port = 3000;

connect();

app.use(express.json());

// app.get("/",(req,res) => {
//     res.send("Hello world!");
// });

app.use(products);

app.listen(port, () =>{
    console.log(port, "포트로 서버가 열렸어요!");
})