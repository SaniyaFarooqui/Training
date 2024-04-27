import UserServiceImplementation from "../service/implementation/UserServiceImplementation";
import { Request,Response } from "express";

class UserController{
    user_service: UserServiceImplementation

    constructor(){
        this.user_service= new UserServiceImplementation();
    }
    public CreateUser = async(req:Request,res:Response)=>{
        let userData =req.body
        if(userData == null || userData == undefined){
            res.status(400).json({error:"please provide the data"})
        }else{
            try {
               let userResponse = await this.user_service.CreateUser(userData) 
               if(userResponse>0){
                res.status(200).json({message:"created successfully"})
               }else{
                res.status(400).json({error:"couldnot able to create please try again"})
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
    public UpdateUser = async(req:Request,res:Response)=>{
        let id = req.params.id
        let userData = req.body
        if(id == null || id == undefined){
            res.status(400).json({error:"please provide id"})
        }else{
            try {
                let isExist = await this.user_service.GetUserById(id)
                if(isExist == null || isExist == undefined){
                    res.status(400).json({error: "please select user properly"})
                }else{
                    let userResponse = await this.user_service.UpdateUser(id,userData)
                    if(userResponse > 0 ){
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
    public GetUserById = async (req : Request,res:Response) => {
        let id = req.params.id;
        if(id == null || id == undefined){
            res.status(404).json({error:"please provide id"})
        }else{
            try {
                let userResponse = await this.user_service.GetUserById(id);
                if(userResponse == null || userResponse == undefined){
                    res.status(400).json({error:"No User Exists"});
                }
                else{
                    res.status(200).json({data: userResponse});
                }
            } catch (error : any) {
                res.status(400).json({error:error.message});
            }
        }
    }
    public GetAllUsers = async (req : Request,res:Response) => {
        let page = req.query.page as unknown as number;
        let limit = req.query.limit as unknown as number;
        let keyword = req.query.keyword as string;
        let filterBy =req.query.filterBy as string;
        keyword = keyword == null || keyword == undefined ? "": keyword
        try {
            let userResponse :{count : number,rows:object[]} | {error ?: string ,status?:number } = await this.user_service.GetAllUsers(page,limit,keyword,filterBy);
            console.log(userResponse)
            if(userResponse == null || userResponse == undefined || page == undefined || limit == undefined||page == null || limit == null){
                res.status(400).json({error:"Something went wrong please try again"});
            }else{
                res.status(200).json({data : userResponse});
            }
        } catch (error:any) {
            res.status(400).json({error:error.message});
        }
    }
    public DeleteUser = async(req:Request,res:Response)=>{
        let id = req.params.id
        if(id == null || id == undefined){
            res.status(400).json({error:"please provide id"})
        }else{
            try {
                let userResponse = await this.user_service.DeleteUser(id)
                if(userResponse == 0){
                    res.status(400).json({error:"couldnot able to delete please try again later"})
                }else{
                    res.status(200).json({message:"deleted successfully"})
                }
            } catch (error:any) {
                res.status(400).json({error:error.message})
            }
        }
    }
    public BulkDeleteUsers = async(req:Request,res:Response) => {
        let {ids} = req.body
        if(ids == null || ids == undefined){
            res.status(400).json({error:"Please provide the id to delete"});
        }else{
            let success :Array<string> = []
            let errors :Array<string> = []
            if(ids.length > 0){
                try {
                    for await(let id of ids){
                        let user = await this.user_service.GetUserById(id)
                        if(user != null || user != undefined){
                            let response = await this.user_service.DeleteUser(id);
                            if(response){
                                success.push(`${user.subject} Deleted Successfully`)
                            }else{
                                errors.push(`${user.subject} Cannot deleted please try again`)
                            }
                        }
                    }
                    if(errors.length > 0 && success.length > 0){
                        res.status(400).json({success:success , errors:errors , message:"Some users cannot be deleted !!!!"})
                    }else if(success.length > 0 && errors.length == 0){
                        res.status(200).json({success:success , errors:errors , message:"All users Deleted Successfully !!!!"})
                    }else{
                        res.status(400).json({success:success , errors:errors , message:"Couldn't Delete any of the users !!!!"})
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

export default UserController