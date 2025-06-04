import { Prisma, users } from "@prisma/client";
import { userType } from "../../../types/userType";


interface IUserService{

    CreateUser(userData: userType):Promise<userType|{error:string,status:number}|undefined>

    UpdateUser(id:string,userData:userType):Promise<userType|{error:"id is required",status:400}|undefined>

    GetAllUsers(page:number,limit:number,keyword:string,filterBy:string):Promise<Prisma.usersGetPayload<{include:{company:true,department:true,role:{include:{permission:true}}}}>[]|undefined|null>

    GetUserById(id:string):Promise<userType|null|{error:string,status:number}|undefined>

    GetUserByRoleId(role_id:string):Promise<userType|null|{error:string,status:number}|undefined>

    GetUserByName(name:string) :Promise<userType|null|{error:string,status:number}|undefined>

    GetUserByEmail(email:string) :Promise<userType|null|{error:string,status:number}|undefined>
    GetUserByCompanyId(company_id:string):Promise<userType|null|{error:string,status:number}|undefined>

    DeleteUser(id:string):Promise<userType|null|{error:string,status:number}|undefined>
}

export default IUserService