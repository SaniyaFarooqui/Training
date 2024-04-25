import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import trainingRouter from "./src/routes/trainingRoutes";



dotenv.config()
let app = express()
let port = 5000

app.use(cors());
app.use(bodyParser());

app.use("/api/training",trainingRouter)
app.listen(port,()=>{
    console.log(`Server is accesssing on port : ${port}`);
})