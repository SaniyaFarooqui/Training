import Product_groupServiceImplementation from "../service/implementation/product_groupServiceImplementation";
import { Response,Request } from "express";

class Product_groupController{
    Product_group_service: Product_groupServiceImplementation

    constructor(){
        this.Product_group_service= new Product_groupServiceImplementation();
    }
    public CreateProduct_group = async(req:Request,res:Response)=>{
        let Product_groupData =req.body
        if(Product_groupData == null || Product_groupData == undefined){
            res.status(400).json({error:"please provide the data"})
        }else{
            try {
                let Product_groupResponse = await this.Product_group_service.CreateProduct_group(Product_groupData) 
                if(Product_groupResponse == 0){
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
    public UpdateProduct_group = async(req:Request,res:Response)=>{
        let id = req.params.id
        let Product_groupData = req.body
        if(id == null || id == undefined){
            res.status(400).json({error:"please provide id"})
        }else{
            try {
                let isExist = await this.Product_group_service.GetProduct_groupById(id)
                if(isExist == null || isExist == undefined){
                    res.status(400).json({error: "please select Product_group properly"})
                }else{
                    let Product_groupResponse = await this.Product_group_service.UpdateProduct_group(id,Product_groupData)
                    if(Product_groupResponse > 0 ){
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
    public GetProduct_groupById = async (req : Request,res:Response) => {
        let id = req.params.id;
        if(id == null || id == undefined){
            res.status(404).json({error:"please provide id"})
        }else{
            try {
                let Product_groupResponse = await this.Product_group_service.GetProduct_groupById(id);
                if(Product_groupResponse == null || Product_groupResponse == undefined){
                    res.status(400).json({error:"No Product_group Exists"});
                }
                else{
                    res.status(200).json({data: Product_groupResponse});
                }
            } catch (error : any) {
                res.status(400).json({error:error.message});
            }
        }
    }
    public GetAllProduct_groups = async (req : Request,res:Response) => {
        let page = Number(req.query.page );
        let limit = Number(req.query.limit);
        try {
            let Product_groupResponse :{count : number,rows:object[]} | {error ?: string ,status?:number } = await this.Product_group_service.GetAllProduct_groups(page,limit);
            if(Product_groupResponse == null || Product_groupResponse == undefined || page == undefined || limit == undefined||page == null || limit == null){
                res.status(200).json({data:Product_groupResponse});
            }else{
                res.status(200).json({data : Product_groupResponse});
            }
        } catch (error:any) {
            res.status(400).json({error:error.message});
        }
    }
    public DeleteProduct_group = async(req:Request,res:Response)=>{
        let id = req.params.id
        if(id == null || id == undefined){
            res.status(400).json({error:"please provide id"})
        }else{
            try {
                let Product_groupResponse = await this.Product_group_service.DeleteProduct_group(id)
                if(Product_groupResponse == 0){
                    res.status(400).json({error:"couldnot able to delete please try again later"})
                }else{
                    res.status(200).json({message:"deleted successfully"})
                }
            } catch (error:any) {
                res.status(400).json({error:error.message})
            }
        }
    }
    public BulkDeleteProduct_groups = async(req:Request,res:Response) => {
        let {ids} = req.body
        if(ids == null || ids == undefined){
            res.status(400).json({error:"Please provide the id to delete"});
        }else{
            let success :Array<string> = []
            let errors :Array<string> = []
            if(ids.length > 0){
                try {
                    for await(let id of ids){
                        let Product_group = await this.Product_group_service.GetProduct_groupById(id)
                        if(Product_group != null || Product_group != undefined){
                            let response = await this.Product_group_service.DeleteProduct_group(id);
                            if(response){
                                success.push(`${Product_group} Deleted Successfully`)
                            }else{
                                errors.push(`${Product_group} Cannot deleted please try again`)
                            }
                        }
                    }
                    if(errors.length > 0 && success.length > 0){
                        res.status(400).json({success:success , errors:errors , message:"Some Product_groups cannot be deleted !!!!"})
                    }else if(success.length > 0 && errors.length == 0){
                        res.status(200).json({success:success , errors:errors , message:"All Product_groups Deleted Successfully !!!!"})
                    }else{
                        res.status(400).json({success:success , errors:errors , message:"Couldn't Delete any of the Product_groups !!!!"})
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

export default Product_groupController