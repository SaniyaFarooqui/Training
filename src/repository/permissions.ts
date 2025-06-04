import { Prisma, PrismaClient } from "@prisma/client";
import { permissions } from "../model/permissions";
import { permissionType } from "../../types/permissiontype";
import { promises } from "nodemailer/lib/xoauth2";


class PermissionRepository{
    prisma:PrismaClient
     
    constructor(){
        this.prisma = new PrismaClient()
    }
    public Createpermission = async(permissionData:permissions):Promise<Prisma.permissionsCreateInput|undefined> =>{
        return await this.prisma.permissions.create({data:permissionData})
    }
    public Updatepermission = async(id:string,permissionData:permissions):Promise<Prisma.permissionsCreateInput|undefined|{error:string,status:number}>  =>{
        return await this.prisma.permissions.update({where:{id:id},data:permissionData})
    }
    public GetAllpermissions = async(page:number,limit:number,keyword:string,filterBy:string):Promise<permissions[]|undefined>=>{
        const permission = await this.prisma.permissions.findMany({
        skip: (page - 1) * limit,
        take: limit,
        });

    return permission;
};
    public GetpermissionById = async(id:string):Promise<permissions|null>=>{
        return await this.prisma.permissions.findUnique({
            where: { 
                id :id
            }
        });
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