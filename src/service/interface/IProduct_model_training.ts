import { product_model_trainings } from "@prisma/client";


interface IProduct_model_trainingService{

    CreateProduct_model_training(product_model_trainingData: product_model_trainings):Promise<product_model_trainings>

    UpdateProduct_model_training(id:string,product_model_trainingData:product_model_trainings):Promise<product_model_trainings>

    GetAllProduct_model_trainings(page:number,limit:number):Promise<{count:number,rows:Array<product_model_trainings>}>

    GetProduct_model_trainingById(id:string):Promise<product_model_trainings>
    
    DeleteProduct_model_training(id:string):Promise<product_model_trainings>
}

export default IProduct_model_trainingService