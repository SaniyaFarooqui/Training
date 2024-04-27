import IUserService from "../interface/IUser";
import usersRepository from "../../repository/users";
import { users } from "@prisma/client";


class UserServiceImplementation implements IUserService{
    
    repository:usersRepository | undefined;
    
    constructor(){
        this.repository = new usersRepository()
    }

    public CreateUser = async(userData: users): Promise<users|any> =>{
        if (userData == null || userData == undefined){
            return{error:"data is required",status:400}
        }else{
            let response = await this.repository?.CreateUser(userData)
            return response
        }
    }

    public UpdateUser = async(id:string,userData:users) :Promise<users|any> => {
        if(id == null || id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository?.UpdateUser(id,userData);
            return response
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