import { permissions } from "@prisma/client";


interface IPermissionService{

    Createpermission(permissionData: permissions):Promise<permissions|undefined>

    Updatepermission(id:string,permissionData:permissions):Promise<permissions>

    GetAllpermissions(page:number,limit:number,keyword:string,filterBy:string):Promise<{count:number,rows:Array<permissions>}>

    GetpermissionById(id:string):Promise<permissions>
    
    Deletepermission(id:string):Promise<permissions>
}

export default IPermissionService