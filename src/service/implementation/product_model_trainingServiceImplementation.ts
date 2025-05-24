import IProduct_model_trainingService from "../interface/IProduct_model_training";
import product_model_trainingsRepository from "../../repository/product_modelTrainings";
import { product_model_trainings} from "@prisma/client";


class Product_model_trainingServiceImplementation implements IProduct_model_trainingService{
    
    repository:product_model_trainingsRepository | undefined;
    
    constructor(){
        this.repository = new product_model_trainingsRepository()
    }

    public CreateProduct_model_training = async(Product_model_trainingData: product_model_trainings): Promise<product_model_trainings|any> =>{
        if (Product_model_trainingData == null || Product_model_trainingData == undefined){
            return{error:"data is required",status:400}
        }else{
            let response = await this.repository?.CreateProduct_model_training(Product_model_trainingData)
            return response
        }
    }

    public UpdateProduct_model_training = async(id:string,Product_model_trainingData:product_model_trainings) :Promise<product_model_trainings|any> => {
        if(id == null || id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository?.UpdateProduct_model_training(id,Product_model_trainingData);
            return response
        }
    }

    public GetAllProduct_model_trainings = async(page:number,limit:number) :Promise<{count:number,rows:Array<product_model_trainings>}|any> => {
        if(page == null || page == undefined || limit == null || limit == undefined || page == 0 || limit == 0){
            page = 1;
            limit = 10;
        }
        let offset = (page - 1) * limit;
        let response = await this.repository?.GetAllProduct_model_trainings(offset,limit);
        return response;
    }

    public GetProduct_model_trainingById = async(id:string) :Promise< product_model_trainings|any > => {
        if(id !== null ||id !== undefined || id !== ":id"){
            let response = await this.repository?.GetProduct_model_trainingById(id);
            return response
        }else{
            let data = {error:"id is required",status:400}
            return data
            
        }
    }

    public GetProductModelTrainingByProductModelId = async(product_model_id:string):Promise<product_model_trainings|null|any>=>{
        if(product_model_id !== null ||product_model_id !== undefined || product_model_id !== ":id"){
            let response = await this.repository?.GetProduct_model_trainingById(product_model_id);
            return response
        }else{
            let data = {error:"id is required",status:400}
            return data
            
        }
    }

    public DeleteProduct_model_training = async(id:string) :Promise<product_model_trainings|any> => {
        if(id == null || id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository?.DeleteProduct_model_training(id);
            return response;
        }
    }
}
export default Product_model_trainingServiceImplementation