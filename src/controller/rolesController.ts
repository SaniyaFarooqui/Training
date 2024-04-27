 import RoleServiceImplementation from "../service/implementation/RoleServiceImplementation";
import { Request,Response } from "express";
import PermissionServiceImplementation from "../service/implementation/permissionServiceImplementation";
import { permissions,roles, status } from "@prisma/client/edge";
import { roleType } from "../../types/roletype";

class RoleController{
    role_service: RoleServiceImplementation
    permission_service: PermissionServiceImplementation

    constructor(){
        this.role_service= new RoleServiceImplementation();
        this.permission_service = new PermissionServiceImplementation();
    }
    public CreateRole = async(req:Request,res:Response)=>{
        let roleData =req.body as roleType
        if(roleData == null || roleData == undefined){
            res.status(400).json({error:"please provide the data"})
        }else{
            let permission :permissions = roleData.permissions as permissions
            try {
               let permission_response = await this.Createpermission(permission) 
               if(permission_response == null|| permission_response == undefined){
                res.status(400).json({error:"couldnot able to create please try again"})
               }else{
                    let role :roles = {name:roleData.name as string ,permissionId:permission_response as string} as roles
                    let role_response = await this.role_service.CreateRole(role);
                    if(role_response == null || role_response == undefined){
                        res.status(200).json({error:"Role cannot be created please try again"});
                    }else{
                        res.status(200).json({message:`${role.name}created successfully`})
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
    public UpdateRole = async(req:Request,res:Response)=>{
        let id = req.params.id
        let roleData = req.body as roleType
        if(id == null || id == undefined){
            res.status(400).json({error:"please provide id"})
        }else{
            try {
                let permission : permissions = roleData.permissions as permissions
                let isExist:roles = await this.role_service.GetRoleById(id)
                if(isExist == null || isExist == undefined){
                    res.status(400).json({error: "please select role properly"})
                }else{
                    let role :roles = {name:roleData.name as string} as roles
                    if(permission == null || permission == undefined){
                        res.status(400).json({error:"permission is required"});
                    }else{
                        let permissionResponse  = await this.Updatepermission(isExist.permissionId,permission);
                        if(typeof permissionResponse == "string"){
                            let roleResponse:roles = await this.role_service.UpdateRole(id,role) 
                            res.status(200).json({message: "updated successfully"})
                        }else{
                            res.status(400).json({error: "could not able to update"})
                        }
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
    public GetRoleById = async (req : Request,res:Response) => {
        let id = req.params.id;
        if(id == null || id == undefined){
            res.status(404).json({error:"please provide id"})
        }else{
            try {
                let roleResponse = await this.role_service.GetRoleById(id);
                if(roleResponse == null || roleResponse == undefined){
                    res.status(400).json({error:"No role Exists"});
                }
                else{
                    res.status(200).json({data: roleResponse});
                }
            } catch (error : any) {
                res.status(400).json({error:error.message});
            }
        }
    }
    public GetAllRoles = async (req : Request,res:Response) => {
        let page = req.query.page as unknown as number;
        let limit = req.query.limit as unknown as number;
        let keyword = req.query.keyword as string;
        let filterBy =req.query.filterBy as string;
        keyword = keyword == null || keyword == undefined ? "": keyword
        try {
            let roleResponse :{count : number,rows:object[]} | {error ?: string ,status?:number } = await this.role_service.GetAllRoles(page,limit,keyword,filterBy);
            console.log(roleResponse)
            if(roleResponse == null || roleResponse == undefined || page == undefined || limit == undefined||page == null || limit == null){
                res.status(400).json({error:"Something went wrong please try again"});
            }else{
                res.status(200).json({data : roleResponse});
            }
        } catch (error:any) {
            res.status(400).json({error:error.message});
        }
    }
    public DeleteRole = async(req:Request,res:Response)=>{
        let id = req.params.id
        if(id == null || id == undefined){
            res.status(400).json({error:"please provide id"})
        }else{
            try {
                let roleResponse = await this.role_service.DeleteRole(id)
                if(roleResponse == 0){
                    res.status(400).json({error:"couldnot able to delete please try again later"})
                }else{
                    res.status(200).json({message:"deleted successfully"})
                }
            } catch (error:any) {
                res.status(400).json({error:error.message})
            }
        }
    }
    public BulkDeleteRoles = async(req:Request,res:Response) => {
        let {ids} = req.body
        if(ids == null || ids == undefined){
            res.status(400).json({error:"Please provide the id to delete"});
        }else{
            let success :Array<string> = []
            let errors :Array<string> = []
            if(ids.length > 0){
                try {
                    for await(let id of ids){
                        let role = await this.role_service.GetRoleById(id)
                        if(role != null || role != undefined){
                            let response = await this.role_service.DeleteRole(id);
                            if(response){
                                success.push(`${role.subject} Deleted Successfully`)
                            }else{
                                errors.push(`${role.subject} Cannot deleted please try again`)
                            }
                        }
                    }
                    if(errors.length > 0 && success.length > 0){
                        res.status(400).json({success:success , errors:errors , message:"Some roles cannot be deleted"})
                    }else if(success.length > 0 && errors.length == 0){
                        res.status(200).json({success:success , errors:errors , message:"All roles Deleted Successfully "})
                    }else{
                        res.status(400).json({success:success , errors:errors , message:"Couldn't Delete any of the roles "})
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

    private Createpermission = async (permission:permissions)=>{
        let permissionData : permissions = await this.permission_service.Createpermission(permission)
        if(permissionData == null || permissionData == undefined){
            return {message:"Something went wrong please try again",status:400}
        }else{
            return permissionData.id
        }
    }
    private Updatepermission = async (id:string,permission:permissions ) :Promise<{message:string,status:number}|string> => {
        let permissionData :permissions = await this.permission_service.Updatepermission(id,permission)
        if(permissionData){
            return permissionData.id
        }else{
            return {message:"Something went wrong please try again",status:400}
        }
    }
}

export default RoleController