import IProduct_group_trainingService from "../interface/IProduct_group_training";
import product_group_trainingsRepository from "../../repository/product_groupTranings";
import { product_group_trainings} from "@prisma/client";


class Product_group_trainingServiceImplementation implements IProduct_group_trainingService{
    
    repository:product_group_trainingsRepository | undefined;
    
    constructor(){
        this.repository = new product_group_trainingsRepository()
    }

    public CreateProduct_group_training = async(Product_group_trainingData: product_group_trainings): Promise<product_group_trainings | { error: string; status: number }| undefined> =>{
        if (Product_group_trainingData == null || Product_group_trainingData == undefined){
            return{error:"data is required",status:400}
        }else{
            let response = await this.repository?.CreateProduct_group_training(Product_group_trainingData)
            return response
        }
    }

    public UpdateProduct_group_training = async(id:string,Product_group_trainingData:product_group_trainings) :Promise<product_group_trainings|any> => {
        if(id == null || id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository?.UpdateProduct_group_training(id,Product_group_trainingData);
            return response
        }
    }

    public GetAllProduct_group_trainings = async(page:number,limit:number) :Promise<{count:number,rows:Array<product_group_trainings>}|any> => {
        if(page == null || page == undefined || limit == null || limit == undefined || page == 0 || limit == 0){
            page = 1;
            limit = 10;
        }
        let offset = (page - 1) * limit;
        let response = await this.repository?.GetAllProduct_group_trainings(offset,limit);
        return response;
    }

    public GetProduct_group_trainingById = async(id:string) :Promise< product_group_trainings|any > => {
        if(id !== null ||id !== undefined || id !== ":id"){
            let response = await this.repository?.GetProduct_group_trainingById(id);
            return response
        }else{
            let data = {error:"id is required",status:400}
            return data
            
        }
    }

    public GetProduct_group_trainingByProductGroupId = async (product_group_id:string):Promise<product_group_trainings|any> => {
        if(product_group_id == null || product_group_id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository?.GetProduct_group_trainingByProductGroupId(product_group_id);
            return response;
        }
    }

    public DeleteProduct_group_training = async(id:string) :Promise<product_group_trainings|any> => {
        if(id == null || id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository?.DeleteProduct_group_training(id);
            return response;
        }
    }
}
export default Product_group_trainingServiceImplementation