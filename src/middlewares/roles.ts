import jwt,{JwtPayload } from "jsonwebtoken";
import RoleServiceImplementation from "../service/implementation/RoleServiceImplementation";
import UserServiceImplementation from "../service/implementation/UserServiceImplementation";
import { Request,Response,NextFunction } from "express";
import { userType } from "../../types/userType";
import {  roles } from "@prisma/client";


declare global{
    namespace Express{
        interface Request{
            users ?: {id:string} | JwtPayload
        }
    }
}

type user = {
    id : string | JwtPayload
}

let roles = new RoleServiceImplementation
let users = new UserServiceImplementation

let RolesRestrict = async(req:Request,res:Response,next:NextFunction) => {
    
    let header = req.headers.authorization
    if(header == null || header == undefined){
        res.status(401).json({error:"Unauthorized Access"});
    }else{
        try {
            let token : string | undefined = header?.split(" ")[1]
            if(token == null || token == undefined){
                res.status(401).json({error:"Unauthorized Access"});
            }else{
                let user:user = jwt.verify(token,process.env.jwt_secret as string) as user
                if(user == null){
                    res.status(400).json({error:"Invalid Credentials"});
                }else{
                    let userData :userType|null = await users.GetUserById(user?.id as string) as userType
                    console.log(userData)
                    if(userData == null || user == undefined){
                        res.status(401).json({error:"Unauthorized Access"});
                    }else{
                        let roleData :roles = await roles.GetRoleById(userData.role_id as string) as roles
                        console.log(roleData)
                        if(roleData == null || roleData == undefined){
                            res.status(401).json({error:"Unauthorized Access"});
                        }else{
                            if( roleData.is_system_admin == true){
                                next()
                            }else{
                                res.status(401).json({error:"Your Not Authorized to Access"});
                            }
                        }
                    }
                }  
            }  
        } catch ( error:any) {
            console.log(error)
            res.status(400).json({error:error})
        }
    }
}

export default RolesRestrict