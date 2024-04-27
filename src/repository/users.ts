import { PrismaClient } from "@prisma/client";
import { users } from "../model/users";

class usersRepository{
    prisma:PrismaClient
     
    constructor(){
        this.prisma = new PrismaClient()
    }
    public CreateUser = async(userData:users):Promise<users>=>{
        return await this.prisma.users.create({data:userData})
    }
    public UpdateUser = async(id:string,userData:users):Promise<users>=>{
        return await this.prisma.users.update({where:{id:id},data:userData})
    }
    public GetAllUsers = async(page:number,limit:number,keyword:string,filterBy:string):Promise<{count:number,rows:Array<users>}>=>{
        let Users = await this.prisma.users.findMany({
            skip:page,
            take:limit
        })
        let count = await this.prisma.users.count()
        return {count:count,rows:Users}
    }
    public GetUserById = async(id:string):Promise<users|null>=>{
        return await this.prisma.users.findUnique({
            where:{
                id:id
            }
        })
    }
    public DeleteUser =async(id:string):Promise<users>=>{
        return await this.prisma.users.delete({
            where:{
                id:id
            }
        })
    }
}
export default usersRepository