import { permissions, Prisma } from "@prisma/client";
import { permissionType } from "../../../types/permissiontype";


interface IPermissionService{

    Createpermission(permissionData: permissions):Promise<Prisma.permissionsCreateInput|undefined> 

    Updatepermission(id:string,permissionData:permissions):Promise<Prisma.permissionsCreateInput|undefined|{error:string,status:number}>   

    GetAllpermissions(page:number,limit:number,keyword:string,filterBy:string):Promise<permissions[]|undefined|null> 

    GetpermissionById(id:string):Promise<permissions|null|undefined|{ error: string; status: number; }>
    
    Deletepermission(id:string):Promise<permissions>
}

export default IPermissionService