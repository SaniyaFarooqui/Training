import { Router } from "express";
import Product_modelController from "../controller/product_modelController";


let product_modelController= new Product_modelController();
let Product_modelRouter :Router = Router();

Product_modelRouter.post("/CreateProduct_model",product_modelController.CreateProduct_model)
Product_modelRouter.put("/UpdateProduct_model/:id",product_modelController.UpdateProduct_model)
Product_modelRouter.get("/GetAllProduct_models",product_modelController.GetAllProduct_models)
Product_modelRouter.get("/GetProduct_modelById/:id",product_modelController.GetProduct_modelById)
Product_modelRouter.delete("/DeleteProduct_model/:id",product_modelController.DeleteProduct_model)
Product_modelRouter.delete("/BulkDeleteProduct_models",product_modelController.BulkDeleteProduct_models)

export default Product_modelRouter