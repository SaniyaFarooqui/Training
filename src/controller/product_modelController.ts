import Product_modelServiceImplementation from "../service/implementation/product_modelServiceImplementation";
import { Response,Request } from "express";

class Product_modelController{
    Product_model_service: Product_modelServiceImplementation

    constructor(){
        this.Product_model_service= new Product_modelServiceImplementation();
    }
    public CreateProduct_model = async(req:Request,res:Response)=>{
        let Product_modelData =req.body
        if(Product_modelData == null || Product_modelData == undefined){
            res.status(400).json({error:"please provide the data"})
        }else{
            try {
                let Product_modelResponse = await this.Product_model_service.CreateProduct_model(Product_modelData) 
                if(Product_modelResponse == 0){
                    res.status(400).json({error:"couldnot able to create please try again"})
                }else{
                    res.status(200).json({message:"created successfully"})
                }  
            } catch (error:any) { 
                if(error.errors){
                    let validationerror = []
                    for await(let response of error.errors){
                        let obj :{path : string,message : string} = {
                            path: "",
                            message: ""
                        };
                        obj.path = response.path,
                        obj.message = response.message
                        validationerror.push(obj);
                    }
                    res.status(400).json({errors : validationerror});
                }else{
                    res.status(400).json({errors : error.message});
                }
            }
        }
    }
    public UpdateProduct_model = async(req:Request,res:Response)=>{
        let id = req.params.id
        let Product_modelData = req.body
        if(id == null || id == undefined){
            res.status(400).json({error:"please provide id"})
        }else{
            try {
                let isExist = await this.Product_model_service.GetProduct_modelById(id)
                if(isExist == null || isExist == undefined){
                    res.status(400).json({error: "please select Product_model properly"})
                }else{
                    let Product_modelResponse = await this.Product_model_service.UpdateProduct_model(id,Product_modelData)
                    if(Product_modelResponse > 0 ){
                        res.status(200).json({message: "updated successfully"})
                    }else{
                        res.status(400).json({error: "could not able to update"})
                    }
                }
            } catch (error:any) {
                if(error.errors){
                    let validationerror = []
                    for await(let response of error.errors){
                        let obj :{path : string,message : string} = {
                            path: "",
                            message: ""
                        };
                        obj.path = response.path,
                        obj.message = response.message
                        validationerror.push(obj);
                    }
                    res.status(400).json({errors : validationerror});
                }else{
                    res.status(400).json({errors : error.message});
                }
            }
        }
    }
    public GetProduct_modelById = async (req : Request,res:Response) => {
        let id = req.params.id;
        if(id == null || id == undefined){
            res.status(404).json({error:"please provide id"})
        }else{
            try {
                let Product_modelResponse = await this.Product_model_service.GetProduct_modelById(id);
                if(Product_modelResponse == null || Product_modelResponse == undefined){
                    res.status(400).json({error:"No Product_model Exists"});
                }
                else{
                    res.status(200).json({data: Product_modelResponse});
                }
            } catch (error : any) {
                res.status(400).json({error:error.message});
            }
        }
    }
    public GetAllProduct_models = async (req : Request,res:Response) => {
        let page = Number(req.query.page );
        let limit = Number(req.query.limit);
        try {
            let Product_modelResponse :{count : number,rows:object[]} | {error ?: string ,status?:number } = await this.Product_model_service.GetAllProduct_models(page,limit);
            if(Product_modelResponse == null || Product_modelResponse == undefined || page == undefined || limit == undefined||page == null || limit == null){
                res.status(200).json({data:Product_modelResponse});
            }else{
                res.status(200).json({data : Product_modelResponse});
            }
        } catch (error:any) {
            res.status(400).json({error:error.message});
        }
    }
    public DeleteProduct_model = async(req:Request,res:Response)=>{
        let id = req.params.id
        if(id == null || id == undefined){
            res.status(400).json({error:"please provide id"})
        }else{
            try {
                let Product_modelResponse = await this.Product_model_service.DeleteProduct_model(id)
                if(Product_modelResponse == 0){
                    res.status(400).json({error:"couldnot able to delete please try again later"})
                }else{
                    res.status(200).json({message:"deleted successfully"})
                }
            } catch (error:any) {
                res.status(400).json({error:error.message})
            }
        }
    }
    public BulkDeleteProduct_models = async(req:Request,res:Response) => {
        let {ids} = req.body
        if(ids == null || ids == undefined){
            res.status(400).json({error:"Please provide the id to delete"});
        }else{
            let success :Array<string> = []
            let errors :Array<string> = []
            if(ids.length > 0){
                try {
                    for await(let id of ids){
                        let Product_model = await this.Product_model_service.GetProduct_modelById(id)
                        if(Product_model != null || Product_model != undefined){
                            let response = await this.Product_model_service.DeleteProduct_model(id);
                            if(response){
                                success.push(`${Product_model} Deleted Successfully`)
                            }else{
                                errors.push(`${Product_model} Cannot deleted please try again`)
                            }
                        }
                    }
                    if(errors.length > 0 && success.length > 0){
                        res.status(400).json({success:success , errors:errors , message:"Some Product_models cannot be deleted !!!!"})
                    }else if(success.length > 0 && errors.length == 0){
                        res.status(200).json({success:success , errors:errors , message:"All Product_models Deleted Successfully !!!!"})
                    }else{
                        res.status(400).json({success:success , errors:errors , message:"Couldn't Delete any of the Product_models !!!!"})
                    }
                } catch (error:any) {
                    console.log(error)
                    res.status(400).json({error:error})
                }
            }else{
                res.status(400).json({error:"Please provide id to delete"});
            }
        }
    
    }
}

export default Product_modelController