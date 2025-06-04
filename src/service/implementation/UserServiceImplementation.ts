import IUserService from "../interface/IUser";
import usersRepository from "../../repository/users";
import { Prisma, users } from "@prisma/client";
import bcrypt from 'bcryptjs'
import { userType } from "../../../types/userType";

class UserServiceImplementation implements IUserService{
    
    repository:usersRepository | undefined;
    
    constructor(){
        this.repository = new usersRepository()
    }

    public CreateUser = async(userData:userType): Promise<userType|{error:string,status:number}|undefined> =>{
        if (userData.password == null || userData.password == undefined){
            return{error:"password is required",status:400}
        }else{
            let salt = await bcrypt.genSalt(10);
            let password = await bcrypt.hash(userData.password, salt);
            userData = JSON.parse(JSON.stringify(userData));
            userData["password"] = password
            let response = await this.repository?.CreateUser(userData as any) ;
            return response 
        }
    }

    public UpdateUser = async(id:string,userData: userType) :Promise<userType|{error:"id is required",status:400}|undefined> => {
        if(id == null || id == undefined){
            return {error:"id is required",status:400}
        }else{
            if(userData.password == null || userData.password == undefined){
                let data = await this.repository?.UpdateUser(id,userData as any);
                return data               
            }else{
                let salt = await bcrypt.genSalt(10);
                let password = await bcrypt.hash(userData.password, salt);
                userData = JSON.parse(JSON.stringify(userData));
                userData["password"] = password
                let response = await this.repository?.UpdateUser(id,userData as any);
                return response;
            }
        }
    }

    public GetAllUsers = async(page:number,limit:number,keyword:string,filterBy:string) :Promise<Prisma.usersGetPayload<{include:{company:true,department:true,role:{include:{permission:true}}}}>[]|undefined|null>=> {
        if(page == null || page == undefined || limit == null || limit == undefined || page == 0 || limit == 0){
            page = 1;
            limit = 10;
        }
        let offset = (page - 1) * limit;
        let response = await this.repository?.GetAllUsers(offset,limit,keyword,filterBy);
        return response;
    }

    public GetUserById = async(id:string) :Promise<userType|null|{error:string,status:number}|undefined>=> {
        if(id !== null ||id !== undefined || id !== ":id"){
            let response = await this.repository?.GetUserById(id);
            return response
        }else{
            let data = {error:"id is required",status:400}
            return data
            
        }
    }

    public GetUserByRoleId =async(role_id:string) :Promise<userType|null|{error:string,status:number}|undefined>=> {
        if(role_id !== null ||role_id !== undefined || role_id !== ":id"){
            let response = await this.repository?.GetUserByRoleId(role_id);
            return response
        }else{
            let data = {error:"id is required",status:400}
            return data
            
        }
    }
    public GetUserByName = async (name: string): Promise<userType|null|{error:string,status:number}|undefined> =>{
        if(name == null || name == undefined){
            return {error:"name is required",status:400}
        }else{
            let response = await this.repository?.GetUserByName(name);
            return response;
        }
    }

    public GetUserByEmail = async(email: string): Promise<userType|null|{error:string,status:number}|undefined>=> {
        if(email == null || email == undefined){
            return {error:"email is required",status:400}
        }else{
            let response = await this.repository?.GetUserByEmail(email);
            return response 
        }
        
       
    }
    
    public GetUserByCompanyId = async(company_id : string):Promise<userType|null|{error:string,status:number}|undefined>=>{
       if( company_id!== null ||company_id !== undefined || company_id !== ":id"){
            let response = await this.repository?.GetUserByRoleId(company_id);
            return response
        }else{
            let data = {error:"id is required",status:400}
            return data
            
        }
    }

    public DeleteUser = async(id:string) :Promise<userType|null|{error:string,status:number}|undefined> => {
        if(id == null || id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository?.DeleteUser(id);
            return response;
        }
    }
}
export default UserServiceImplementation