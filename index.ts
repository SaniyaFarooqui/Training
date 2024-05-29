import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import trainingRouter from "./src/routes/trainingRoutes";
import schedule_trainingRouter from "./src/routes/schedule_trainingRoutes";
import UserRouter from "./src/routes/userRoutes";
import RoleRouter from "./src/routes/roleRoutes";
import companyRouter from "./src/routes/companyRoutes";
import Product_modelRouter from "./src/routes/product_modelRoutes";
import Product_groupRouter from "./src/routes/product_groupRoutes";
import Certificate_templateRouter from "./src/routes/certificate_templateRoutes";
import CertificateRouter from "./src/routes/certificateRoutes";



dotenv.config()
let app = express()
let port = 5000

app.use(cors());
app.use(bodyParser());

app.use("/api/training",trainingRouter)
app.use("/api/schedule_training",schedule_trainingRouter)
app.use("/api/user",UserRouter)
app.use("/api/role",RoleRouter)
app.use("/api/company",companyRouter)
app.use("/api/product_model",Product_modelRouter)
app.use("/api/product_group",Product_groupRouter)
app.use("/api/certificate_template",Certificate_templateRouter)
app.use("/api/Certificate",CertificateRouter)
const server = app.listen(port,()=>{
    console.log(`Server is accesssing on port : ${port}`);
})

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Process terminated');
    });
});

process.on('SIGINT', () => {
    server.close(() => {
        console.log('Process interrupted');
        process.exit(0);
    });
});
server.on('error', (error) => {
    if (error.message === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use`);
        process.exit(1);
    } else {
        console.error('Server error:', error);
    }
});