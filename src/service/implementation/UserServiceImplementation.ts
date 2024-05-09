import IUserService from "../interface/IUser";
import usersRepository from "../../repository/users";
import { users } from "@prisma/client";
import bcrypt from 'bcryptjs'

class UserServiceImplementation implements IUserService{
    
    repository:usersRepository | undefined;
    
    constructor(){
        this.repository = new usersRepository()
    }

    public CreateUser = async(userData: users): Promise<users|any> =>{
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

    public UpdateUser = async(id:string,userData:users) :Promise<users|any> => {
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

    public GetAllUsers = async(page:number,limit:number,keyword:string,filterBy:string) :Promise<{count:number,rows:Array<users>}|any> => {
        if(page == null || page == undefined || limit == null || limit == undefined || page == 0 || limit == 0){
            page = 1;
            limit = 10;
        }
        let offset = (page - 1) * limit;
        let response = await this.repository?.GetAllUsers(offset,limit,keyword,filterBy);
        return response;
    }

    public GetUserById = async(id:string) :Promise< users|any > => {
        if(id !== null ||id !== undefined || id !== ":id"){
            let response = await this.repository?.GetUserById(id);
            return response
        }else{
            let data = {error:"id is required",status:400}
            return data
            
        }
    }

    public GetUserByRoleId =async(role_id:string) :Promise< users|any > => {
        if(role_id !== null ||role_id !== undefined || role_id !== ":id"){
            let response = await this.repository?.GetUserByRoleId(role_id);
            return response
        }else{
            let data = {error:"id is required",status:400}
            return data
            
        }
    }
    public GetUserByName = async (name: string): Promise<users|any> =>{
        if(name == null || name == undefined){
            return {error:"name is required",status:400}
        }else{
            let response = await this.repository?.GetUserByName(name);
            return response;
        }
    }

    public GetUserByEmail = async(email: string): Promise<users|any>=> {
        if(email == null || email == undefined){
            return {error:"email is required",status:400}
        }else{
            let response = await this.repository?.GetUserByEmail(email);
            return response as unknown as users
        }
        
       
    }
    
    public GetUserByCompanyId = async(page:number,limit:number,keyword:string,filterBy:string,company_id : string):Promise<{count:number,rows:Array<users>}|any>=>{
        if(page == null || page == undefined || limit == null || limit == undefined || page == 0 || limit == 0||company_id == null && company_id == undefined){
            page = 1;
            limit = 10;
        }else{
            let offset = (page - 1) * limit;
            let response = await this.repository?.GetUserByCompanyId(offset,limit,keyword,filterBy,company_id)
            return response;
        }
    }

    public DeleteUser = async(id:string) :Promise<users|any> => {
        if(id == null || id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository?.DeleteUser(id);
            return response;
        }
    }
}
export default UserServiceImplementation