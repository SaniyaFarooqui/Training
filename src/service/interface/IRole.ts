import { Prisma, roles } from "@prisma/client";


interface IRoleService{

    CreateRole(roleData: roles):Promise<roles|{error:string,status:number}|undefined> 

    UpdateRole(id:string,roleData:roles):Promise<roles|{error:string,status:number}|undefined> 

    GetAllRoles(page:number,limit:number,keyword:string,filterBy:string):Promise<Prisma.rolesGetPayload<{include:{permission:true}}>[]|undefined>

    GetRoleById(id:string):Promise< roles|{error:string,status:number}|null|undefined >
    
    DeleteRole(id:string):Promise< roles|{error:string,status:number}|null|undefined >
}

export default IRoleService