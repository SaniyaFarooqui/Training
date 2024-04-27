import { PrismaClient } from "@prisma/client";
import { permissions } from "../model/permissions";
import { permissionType } from "../../types/permissiontype";


class PermissionRepository{
    prisma:PrismaClient
     
    constructor(){
        this.prisma = new PrismaClient()
    }
    public Createpermission = async(permissionData:permissions):Promise<permissions>=>{
        return await this.prisma.permissions.create({data:permissionData})
    }
    public Updatepermission = async(id:string,permissionData:permissions):Promise<permissions>=>{
        return await this.prisma.permissions.update({where:{id:id},data:permissionData})
    }
    public GetAllpermissions = async(page:number,limit:number,keyword:string,filterBy:string):Promise<{count:number,rows:Array<permissions>}>=>{
        let permissions = await this.prisma.permissions.findMany({
            skip:page,
            take:limit
        })
        let count = await this.prisma.permissions.count()
        return {count:count,rows:permissions}
    }
    public GetpermissionById = async(id:string):Promise<permissions|null>=>{
        return await this.prisma.permissions.findUnique({
            where:{
                id:id
            }
        })
    }
    public Deletepermission =async(id:string):Promise<permissions>=>{
        return await this.prisma.permissions.delete({
            where:{
                id:id
            }
        })
    }
}
export default PermissionRepository