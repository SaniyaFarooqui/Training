import { PrismaClient } from "@prisma/client";
import { roles } from "@prisma/client";

class rolesRepository{
    prisma:PrismaClient
     
    constructor(){
        this.prisma = new PrismaClient()
    }
    public CreateRole = async(roleData:roles):Promise<roles>=>{
        return await this.prisma.roles.create({data:roleData})
    }
    public UpdateRole = async(id:string,roleData:roles):Promise<roles>=>{
        return await this.prisma.roles.update({where:{id:id},data:roleData})
    }
    public GetAllRoles = async(page:number,limit:number,keyword:string,filterBy:string):Promise<{count:number,rows:Array<roles>}>=>{
        let roles = await this.prisma.roles.findMany({
            skip:page,
            take:limit
        })
        let count = await this.prisma.roles.count()
        return {count:count,rows:roles}
    }
    public GetRoleById = async(id:string):Promise<roles|null>=>{
        return await this.prisma.roles.findUnique({
            where:{
                id:id
            }
        })
    }
    public DeleteRole =async(id:string):Promise<roles>=>{
        return await this.prisma.roles.delete({
            where:{
                id:id
            }
        })
    }
}
export default rolesRepository