import jwt, { JwtPayload } from "jsonwebtoken"
import PermissionServiceImplementation from "../service/implementation/permissionServiceImplementation";
import { Request,Response,NextFunction } from "express";
import { userType } from "../../types/userType";
import { permissionType } from "../../types/permissiontype";
import RoleServiceImplementation from "../service/implementation/RoleServiceImplementation";
import UserServiceImplementation from "../service/implementation/UserServiceImplementation";
import { roleType } from "../../types/roletype";
import { permissions, Prisma } from "@prisma/client";

declare global{
    namespace Express{
        interface Request{
            users?: {id:string} | JwtPayload
        }
    }
}

type user = {
    id : string | JwtPayload
}

let role_service = new RoleServiceImplementation()
let permission_service = new PermissionServiceImplementation()
let userService = new UserServiceImplementation()

let PermissonsRestrict = async(req:Request,res:Response,next:NextFunction) => {
    let header = req.headers.authorization
    let type = req.headers.type as string
    
    if(header == null || header == undefined){
        res.status(401).json({error:"Unauthorized Access"});
        console.log(header)
    }else if(type == null ||type == undefined){
        res.status(401).json({error:"type required Unauthorized Access"});
    }
    else{
    
        try {
            let token : string | undefined = header?.split(" ")[1]
            if(token == null || token == undefined){
                res.status(401).json({error:"Unauthorized Access"});
            }else{
                let user = jwt.verify(token,process.env.jwt_secret as string) as user
                console.log(user,"this is of user")
                if(user == null || user == undefined){
                    res.status(401).json({error:"Unauthorized Access"});
                }else{
                    let userData :userType = await userService.GetUserById(user?.id as string) as userType
                    console.log(userData,"this is userdata")
                    if(userData == null || userData == undefined){
                        res.status(400).json({error:"Unauthorized Access"});
                    }else{
                        let RoleData = await role_service.GetRoleById(userData.role_id) 
                        if(RoleData == null || RoleData == undefined){
                            res.status(400).json({error:"No role exist"})
                        }else{
                            let permissionData = await permission_service.GetpermissionById(RoleData.permissionId)
                            console.log(permissionData)
                            if(permissionData != null || permissionData != undefined ){
                                switch(type){
                                case "create":
                                    if(permissionData.create == true){
                                        next()
                                    }else{  
                                        res.status(401).json({error:"Unauthorized Access for create"});
                                    }
                                    break;

                                case "update":
                                    if(permissionData.update == true){
                                        next()
                                    }else{  
                                        res.status(401).json({error:"Unauthorized Access for update"});
                                    }
                                    break;

                                case "view":
                                    if(permissionData["view"] == true){
                                        console.log("this is the case",permissionData.view)
                                        next()
                                    }else{  
                                        res.status(401).json({error:"Unauthorized Access for view"});
                                    }
                                    break;

                                case "delete":
                                    if(permissionData.delete == true){
                                        next()
                                    }else{  
                                        res.status(401).json({error:"Unauthorized Access for"});
                                    }
                                    break;
                                
                                default:
                                    res.status(401).json({error:"Unauthorized Access"});
                            }

                            }
                        }   
                    }
                }
            }
        } catch (error:any) {
            console.log(error)
            res.status(400).json({error:error})   
        }
    }
}

export default PermissonsRestrict;