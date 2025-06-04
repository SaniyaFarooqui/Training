import { Prisma, PrismaClient } from "@prisma/client";
import { users } from "../model/users";
import { userType } from "../../types/userType";

class usersRepository{
    prisma:PrismaClient
     
    constructor(){
        this.prisma = new PrismaClient()
    }
    public CreateUser = async(userData:Prisma.usersCreateInput):Promise<userType>=>{
        return await this.prisma.users.create({data:userData})
    }
    public UpdateUser = async(id:string,userData:Prisma.usersCreateInput):Promise<userType|{error:"id is required",status:400}|undefined>=>{
        return await this.prisma.users.update({where:{id:id},data:userData})
    }
    public GetAllUsers = async(page:number,limit:number,keyword:string,filterBy:string):Promise<Prisma.usersGetPayload<{include:{company:true,department:true,role:{include:{permission:true}}}}>[]|undefined|null>=>{
        let Users = await this.prisma.users.findMany({
            where:{
                OR:[
                    {
                        name:{
                            startsWith:keyword,
                            mode:'insensitive'
                        }

                    }
                ],
                surname:filterBy
            },
            skip:page,
            take:limit,
            include:{
                company:true,
                department:true,
                role:{
                    include:{
                        permission:true
                    }
                }
            }
        })
        
        return Users
    }
    public GetUserById = async(id:string):Promise<userType|any>=>{
        return await this.prisma.users.findUnique({
            where:{
                id:id
            }
        })
    }
    public GetUserByRoleId = async(role_id:string):Promise<userType|null>=>{
        return await this.prisma.users.findFirst({
            where:{
                role_id:role_id
            }
        })
    }
    public GetUserByName = async (name:string) :Promise<userType|null > => {
        return await this.prisma.users.findFirst({
            where:{
                name:name
            }
        })
    }

    public GetUserByEmail = async (email:string) :Promise<userType|null> => {
        return await this.prisma.users.findFirst({
            where:{
                email:email
            }
        })
    }
    public GetUserByCompanyId = async(company_id : string):Promise<userType|null>=>{
         return await this.prisma.users.findFirst({
            where:{
                company_id:company_id
            }
        })
    }
    public DeleteUser =async(id:string):Promise<userType>=>{
        return await this.prisma.users.delete({
            where:{
                id:id
            }
        })
    }
}
export default usersRepository