import IRoleService from "../interface/IRole";
import RolesRepository from "../../repository/roles";
import { roles } from "@prisma/client";


class RoleServiceImplementation implements IRoleService{
    
    repository:RolesRepository | undefined;
    
    constructor(){
        this.repository = new RolesRepository()
    }

    public CreateRole = async(RoleData: roles): Promise<roles|any> =>{
        if (RoleData == null || RoleData == undefined){
            return{error:"data is required",status:400}
        }else{
            let response = await this.repository?.CreateRole(RoleData)
            return response
        }
    }

    public UpdateRole = async(id:string,RoleData:roles) :Promise<roles|any> => {
        if(id == null || id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository?.UpdateRole(id,RoleData);
            return response
        }
    }

    public GetAllRoles = async(page:number,limit:number,keyword:string,filterBy:string) :Promise<{count:number,rows:Array<roles>}|any> => {
        if(page == null || page == undefined || limit == null || limit == undefined || page == 0 || limit == 0){
            page = 1;
            limit = 10;
        }
        let offset = (page - 1) * limit;
        let response = await this.repository?.GetAllRoles(offset,limit,keyword,filterBy);
        return response;
    }

    public GetRoleById = async(id:string) :Promise< roles|any > => {
        if(id !== null ||id !== undefined || id !== ":id"){
            let response = await this.repository?.GetRoleById(id);
            return response
        }else{
            let data = {error:"id is required",status:400}
            return data
            
        }
    }

    public DeleteRole = async(id:string) :Promise<roles|any> => {
        if(id == null || id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository?.DeleteRole(id);
            return response;
        }
    }
}
export default RoleServiceImplementation