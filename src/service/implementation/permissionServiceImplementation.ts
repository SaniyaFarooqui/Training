import PermissionRepository from "../../repository/permissions";
import { permissions } from "@prisma/client";
import IPermissionService from "../interface/IPermission";
import { permissionType } from "../../../types/permissiontype";


class PermissionServiceImplementation implements IPermissionService{
    
    repository:PermissionRepository | undefined;
    
    constructor(){
        this.repository = new PermissionRepository()
    }

    public Createpermission = async(permissionData: permissions): Promise<permissions|any> =>{
        let response = await this.repository?.Createpermission(permissionData)
        return response 
        
    }

    public Updatepermission = async(id:string,permissionData:permissions) :Promise<permissions|any> => {
        if(id == null || id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository?.Updatepermission(id,permissionData);
            return response
        }
    }

    public GetAllpermissions = async(page:number,limit:number,keyword:string,filterBy:string) :Promise<{count:number,rows:Array<permissions>}|any> => {
        if(page == null || page == undefined || limit == null || limit == undefined || page == 0 || limit == 0){
            page = 1;
            limit = 10;
        }
        let offset = (page - 1) * limit;
        let response = await this.repository?.GetAllpermissions(offset,limit,keyword,filterBy);
        return response;
    }

    public GetpermissionById = async(id:string) :Promise< permissions|any > => {
        if(id !== null ||id !== undefined || id !== ":id"){
            let response = await this.repository?.GetpermissionById(id);
            return response
        }else{
            let data = {error:"id is required",status:400}
            return data
            
        }
    }

    public Deletepermission = async(id:string) :Promise<permissions|any> => {
        if(id == null || id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository?.Deletepermission(id);
            return response;
        }
    }
}
export default PermissionServiceImplementation