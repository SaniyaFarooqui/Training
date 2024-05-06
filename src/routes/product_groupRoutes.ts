import { Router } from "express";
import Product_groupController from "../controller/product_groupController";


let product_groupController= new Product_groupController();
let Product_groupRouter :Router = Router();

Product_groupRouter.post("/CreateProduct_group",product_groupController.CreateProduct_group)
Product_groupRouter.put("/UpdateProduct_group/:id",product_groupController.UpdateProduct_group)
Product_groupRouter.get("/GetAllProduct_groups",product_groupController.GetAllProduct_groups)
Product_groupRouter.get("/GetProduct_groupById/:id",product_groupController.GetProduct_groupById)
Product_groupRouter.delete("/DeleteProduct_group/:id",product_groupController.DeleteProduct_group)
Product_groupRouter.delete("/BulkDeleteProduct_groups",product_groupController.BulkDeleteProduct_groups)

export default Product_groupRouter