import { product_group_trainings } from "@prisma/client";


interface IProduct_group_trainingService{

    CreateProduct_group_training(product_group_trainingData: product_group_trainings):Promise<product_group_trainings | { error: string; status: number }| undefined> 

    UpdateProduct_group_training(id:string,product_group_trainingData:product_group_trainings):Promise<product_group_trainings>

    GetAllProduct_group_trainings(page:number,limit:number):Promise<{count:number,rows:Array<product_group_trainings>}>

    GetProduct_group_trainingById(id:string):Promise<product_group_trainings>
    
    DeleteProduct_group_training(id:string):Promise<product_group_trainings>
}

export default IProduct_group_trainingService