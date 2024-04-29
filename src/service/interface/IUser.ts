import { users } from "@prisma/client";


interface IUserService{

    CreateUser(userData: users):Promise<users>

    UpdateUser(id:string,userData:users):Promise<users>

    GetAllUsers(page:number,limit:number,keyword:string,filterBy:string):Promise<{count:number,rows:Array<users>}>

    GetUserById(id:string):Promise<users>

    GetUserByName(name:string) :Promise<users>

    GetUserByEmail(email:string) :Promise<users>
    
    DeleteUser(id:string):Promise<users>
}

export default IUserService