import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";



dotenv.config()
let app = express()
let port = process.env.PORT

app.use(cors());
app.use(bodyParser());

app.listen(port,()=>{
    console.log(`Server is accesssing on port : ${port}`);
})