import IProduct_modelService from "../interface/IProduct_model";
import Product_modelsRepository from "../../repository/product_models";
import { product_models } from "@prisma/client";


class Product_modelServiceImplementation implements IProduct_modelService{
    
    repository:Product_modelsRepository | undefined;
    
    constructor(){
        this.repository = new Product_modelsRepository()
    }

    public CreateProduct_model = async(Product_modelData: product_models): Promise<product_models|any> =>{
        if (Product_modelData == null || Product_modelData == undefined){
            return{error:"data is required",status:400}
        }else{
            let response = await this.repository?.CreateProduct_model(Product_modelData)
            return response
        }
    }

    public UpdateProduct_model = async(id:string,Product_modelData:product_models) :Promise<product_models|any> => {
        if(id == null || id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository?.UpdateProduct_model(id,Product_modelData);
            return response
        }
    }

    public GetAllProduct_models = async(page:number,limit:number) :Promise<{count:number,rows:Array<product_models>}|any> => {
        if(page == null || page == undefined || limit == null || limit == undefined || page == 0 || limit == 0){
            page = 1;
            limit = 10;
        }
        let offset = (page - 1) * limit;
        let response = await this.repository?.GetAllProduct_models(offset,limit);
        return response;
    }

    public GetProduct_modelById = async(id:string) :Promise< product_models|any > => {
        if(id !== null ||id !== undefined || id !== ":id"){
            let response = await this.repository?.GetProduct_modelById(id);
            return response
        }else{
            let data = {error:"id is required",status:400}
            return data
            
        }
    }

    public DeleteProduct_model = async(id:string) :Promise<product_models|any> => {
        if(id == null || id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository?.DeleteProduct_model(id);
            return response;
        }
    }
}
export default Product_modelServiceImplementation