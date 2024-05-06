import { product_models } from "@prisma/client";


interface IProduct_modelService{

    CreateProduct_model(product_modelData: product_models):Promise<product_models>

    UpdateProduct_model(id:string,product_modelData:product_models):Promise<product_models>

    GetAllProduct_models(page:number,limit:number):Promise<{count:number,rows:Array<product_models>}>

    GetProduct_modelById(id:string):Promise<product_models>
    
    DeleteProduct_model(id:string):Promise<product_models>
}

export default IProduct_modelService