import { PrismaClient } from "@prisma/client";
import { users } from "../model/users";

class usersRepository{
    prisma:PrismaClient
     
    constructor(){
        this.prisma = new PrismaClient()
    }
    public CreateUser = async(userData:users):Promise<users|any>=>{
        return await this.prisma.users.create({data:userData})
    }
    public UpdateUser = async(id:string,userData:users):Promise<users|any>=>{
        return await this.prisma.users.update({where:{id:id},data:userData})
    }
    public GetAllUsers = async(page:number,limit:number,keyword:string,filterBy:string):Promise<{count:number,rows:Array<users>}|any>=>{
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
                role:{
                    include:{
                        permission:true
                    }
                }
            }
        })
        let count = await this.prisma.users.count()
        return {count:count,rows:Users}
    }
    public GetUserById = async(id:string):Promise<users|any>=>{
        return await this.prisma.users.findUnique({
            where:{
                id:id
            }
        })
    }
    public GetUserByName = async (name:string) :Promise<users| any > => {
        return await this.prisma.users.findFirst({
            where:{
                name:name
            }
        })
    }

    public GetUserByEmail = async (email:string) :Promise<users|any> => {
        return await this.prisma.users.findFirst({
            where:{
                email:email
            }
        })
    }
    public DeleteUser =async(id:string):Promise<users|any>=>{
        return await this.prisma.users.delete({
            where:{
                id:id
            }
        })
    }
}
export default usersRepository