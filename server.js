const express = require("express");
const PORT = process.env.PORT;


const app = express();

app.listen(PORT, ()=>{
    console.log(`server is running on PORT: ${PORT}`);
})