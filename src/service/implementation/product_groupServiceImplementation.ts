import IProduct_groupService from "../interface/IProduct_group";
import product_groupsRepository from "../../repository/product_groups";
import { product_groups} from "@prisma/client";


class Product_groupServiceImplementation implements IProduct_groupService{
    
    repository:product_groupsRepository | undefined;
    
    constructor(){
        this.repository = new product_groupsRepository()
    }

    public CreateProduct_group = async(Product_groupData: product_groups): Promise<product_groups|any> =>{
        if (Product_groupData == null || Product_groupData == undefined){
            return{error:"data is required",status:400}
        }else{
            let response = await this.repository?.CreateProduct_group(Product_groupData)
            return response
        }
    }

    public UpdateProduct_group = async(id:string,Product_groupData:product_groups) :Promise<product_groups|any> => {
        if(id == null || id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository?.UpdateProduct_group(id,Product_groupData);
            return response
        }
    }

    public GetAllProduct_groups = async(page:number,limit:number) :Promise<{count:number,rows:Array<product_groups>}|any> => {
        if(page == null || page == undefined || limit == null || limit == undefined || page == 0 || limit == 0){
            page = 1;
            limit = 10;
        }
        let offset = (page - 1) * limit;
        let response = await this.repository?.GetAllProduct_groups(offset,limit);
        return response;
    }

    public GetProduct_groupById = async(id:string) :Promise< product_groups|any > => {
        if(id !== null ||id !== undefined || id !== ":id"){
            let response = await this.repository?.GetProduct_groupById(id);
            return response
        }else{
            let data = {error:"id is required",status:400}
            return data
            
        }
    }

    public DeleteProduct_group = async(id:string) :Promise<product_groups|any> => {
        if(id == null || id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository?.DeleteProduct_group(id);
            return response;
        }
    }
}
export default Product_groupServiceImplementation