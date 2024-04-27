import { roles } from "@prisma/client";


interface IRoleService{

    CreateRole(roleData: roles):Promise<roles>

    UpdateRole(id:string,roleData:roles):Promise<roles>

    GetAllRoles(page:number,limit:number,keyword:string,filterBy:string):Promise<{count:number,rows:Array<roles>}>

    GetRoleById(id:string):Promise<roles>
    
    DeleteRole(id:string):Promise<roles>
}

export default IRoleService