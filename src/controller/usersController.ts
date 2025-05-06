import jwt,{ JwtPayload } from "jsonwebtoken";
import UserServiceImplementation from "../service/implementation/UserServiceImplementation";
import { Request,Response } from "express";
import bcrypt from 'bcryptjs'
import data from "../../config";
import { Readable } from "stream";
import fs from 'fs';
import { users } from "@prisma/client";


class UserController{
    user_service: UserServiceImplementation

    public destination: string ="src/upload"

    constructor(){
        this.user_service= new UserServiceImplementation();
    }
    public CreateUser = async(req:Request,res:Response)=>{
        let userData =req.body
        console.log(userData)
        let profile_image=req.file
        console.log(profile_image);
        if(userData.name == null || userData.name == undefined || userData.email== undefined|| userData.email == null || userData.password == null || userData.password == undefined){
            res.status(400).json({error:"please provide the data"})
        }else{
            try {
                let UserVaule = await this.CreateUserData(userData)
                if(UserVaule){
                    if(profile_image == null||profile_image == undefined){
                        let userResponse: any = await this.user_service.CreateUser(userData);
                        if(userResponse == null || userResponse == undefined){
                            res.status(400).json({error:"user not created please try again"})
                        }else{
                            res.status(200).json({message:"user created successfully"})
                        } 
                }else{
                    let isExist = await this.user_service.GetUserByEmail(userData.email)
                    if(isExist == null || isExist == undefined){
                        if(profile_image == null || profile_image == undefined){
                            let roleExist = await this.user_service.GetUserByRoleId(userData.role_id)
                            if(roleExist == null || roleExist == undefined){
                                let userResponse = await this.user_service.CreateUser(userData) 
                                if(userResponse == 0){
                                    res.status(400).json({error:"couldnot able to create please try again"})
                                }else{
                                    res.status(200).json({message:"created successfully"})
                                }
                            }else{
                                res.status(400).json({error:`${roleExist.name} Already exists please try different role`})
                            }
                    }else{
                        if(profile_image.mimetype?.split("/")[1] == "jpg" || profile_image.mimetype?.split("/")[1] == "png" || profile_image.mimetype?.split("/")[1] == "jpeg"){
                            let stream = Readable.from(profile_image.buffer as Buffer);
                            let filename = profile_image.originalname?.replaceAll(" ","_");
                            let filePath = `${this.destination}/${filename?.split(".")[0]+"_"+this.getTimeStamp()+"."+filename?.split(".")[1]}`
                            let writer = fs.createWriteStream(filePath);
                            stream.pipe(writer);
                            let url = `${process.env.server}/${filePath}`
                            userData["profile_image"] = url;
                            let response :any = this.user_service.CreateUser(userData);
                            if(response.error && response.status){
                                res.status(400).json({error:response.error})
                            }else{
                                res.status(200).json({message:"Created User Successfully"})
                            }
                        }else{
                            res.status(400).json({error:"Please Select either png or jpg or jpeg file"});    
                        }
                    }
                }else{
                    res.status(400).json({error:"user not created"});
                }
            }
        }
            } catch (error:any) {
                if(error.errors){
                    let validationerror = []
                    for await(let response of error.errors){
                        let obj :{path : string,message : string} = {
                            path: "",
                            message: ""
                        };
                        obj.path = response.path,
                        obj.message = response.message
                        validationerror.push(obj);
                    }
                    res.status(400).json({errors : validationerror});
                }else{
                    res.status(400).json({errors : error.message});
                }
            }
        }
    }
    public LoginController = async(req : Request, res : Response) =>{
        let {email,password} = req.body;
        if(email == null || password == null||password == undefined || email == undefined){
            res.status(401).json({errors :"please enter email or password"});
        }else{
            let isExist = await this.user_service.GetUserByEmail(email);
            if(isExist == null){
                res.status(400).json({error:"Account doesn't Exist"});
            }else{
                if(await bcrypt.compare(password,isExist.password)){
                    let token = jwt.sign(
                        { id: isExist.id },
                        data.jwt_secret,
                        { expiresIn: "1day" }

                    )
                    let refreshToken = jwt.sign(
                        { id: isExist.id },
                        data.jwt_secret,                        
                        { expiresIn: "356d" }
                      );
                      res.cookie("refreshToken", refreshToken, {
                        httpOnly: true,
                        secure: true,
                      })
                      res.cookie("AccessToken", token, { httpOnly: true, secure: true });
                      res.status(200).json({message :"login successful",user:isExist})
                }else{
                    res.status(400).json({error:"Invalid Password"});
                }
            }
        }
    };

    public RefreshToken = async (req:Request, res:Response) => {
        let refreshToken = req.params.token;
        if (refreshToken == null || refreshToken == undefined) {
          res.status(400).json({ error: "refresh token required" });
        } else {
          try {
            let decode :{id:string}|JwtPayload = jwt.verify(refreshToken,data.jwt_secret as string) as{id:string};
            console.log(decode)
            if (decode == null || decode == undefined) {
              res.status(400).json({ error: "invalid token" });
            } else {
              let userData = await this.user_service.GetUserById(decode.id)
              if (userData == null || userData == undefined) {
                res.status(400).json({ error: "invalid refresh token" });
              } else {
                let token = jwt.sign(
                  { data :decode.id},
                  data.jwt_secret as string,
                  { expiresIn: "3days" }
                );
                res.cookie("AccessToken", token, { httpOnly: true, secure: true });
                res.status(200).json({ AccessToken: token});
              }
            }
          } catch (error:any) {
            console.log(error)
            res.status(400).json({ error: error.message });
          }
        }
      };

    public logoutController =(req: Request, res: Response)=>{
        try {
            res.cookie("AccessToken","",{maxAge:1});
            res.cookie("refreshToken","",{maxAge:1});
            res.status(200).json({message:"Logout successful"});
        }catch (error:any) {
            res.status(400).json({error:error});    
        }
    }
    
    public UpdateUser = async(req:Request,res:Response)=>{
        let id = req.params.id
        let userData = req.body
        if(id == null || id == undefined){
            res.status(400).json({error:"please provide id"})
        }else{
            try {
                let isExist = await this.user_service.GetUserById(id)
                if(isExist == null || isExist == undefined){
                    res.status(400).json({error: "please select user properly"})
                }else{
                    let userResponse = await this.user_service.UpdateUser(id,userData)
                    if(userResponse > 0 ){
                        res.status(200).json({message: "updated successfully"})
                    }else{
                        res.status(400).json({error: "could not able to update"})
                    }
                }
            } catch (error:any) {
                if(error.errors){
                    let validationerror = []
                    for await(let response of error.errors){
                        let obj :{path : string,message : string} = {
                            path: "",
                            message: ""
                        };
                        obj.path = response.path,
                        obj.message = response.message
                        validationerror.push(obj);
                    }
                    res.status(400).json({errors : validationerror});
                }else{
                    res.status(400).json({errors : error.message});
                }
            }
        }
    }
    public GetUserById = async (req : Request,res:Response) => {
        let id = req.params.id;
        if(id == null || id == undefined){
            res.status(404).json({error:"please provide id"})
        }else{
            try {
                let userResponse = await this.user_service.GetUserById(id);
                if(userResponse == null || userResponse == undefined){
                    res.status(400).json({error:"No User Exists"});
                }
                else{
                    res.status(200).json({data: userResponse});
                }
            } catch (error : any) {
                res.status(400).json({error:error.message});
            }
        }
    }
    public GetAllUsers = async (req : Request,res:Response) => {
        let page = Number(req.query.page );
        let limit = Number(req.query.limit);
        let keyword = req.query.keyword as string;
        let filterBy =req.query.filterBy as string;
        keyword = keyword == null || keyword == undefined ? "": keyword
        try {
            let userResponse :{count : number,rows:object[]} | {error ?: string ,status?:number } = await this.user_service.GetAllUsers(page,limit,keyword,filterBy);
            if(userResponse == null || userResponse == undefined || page == undefined || limit == undefined||page == null || limit == null){
                res.status(200).json({data:userResponse});
            }else{
                res.status(200).json({data : userResponse});
            }
        } catch (error:any) {
            res.status(400).json({error:error.message});
        }
    }
    public GetUserByCompanyId = async(req:Request,res:Response)=>{
        let company_id=req.params.company_id;
        let page = Number(req.query.page );
        let limit = Number(req.query.limit);
        let keyword = req.query.keyword as string;
        let filterBy =req.query.filterBy as string;
        keyword = keyword == null || keyword == undefined ? "": keyword
        try {
            let userResponse= await this.user_service.GetUserByCompanyId(page,limit,keyword,filterBy,company_id);
            if(userResponse == null || userResponse == undefined){
                res.status(200).json({data:userResponse});
            }
            else{
                res.status(200).json({data: userResponse});
            }
        } catch (error : any) {
            res.status(400).json({error:error.message});
        }
    }
    public DeleteUser = async(req:Request,res:Response)=>{
        let id = req.params.id
        if(id == null || id == undefined){
            res.status(400).json({error:"please provide id"})
        }else{
            try {
                let userResponse = await this.user_service.DeleteUser(id)
                if(userResponse == 0){
                    res.status(400).json({error:"couldnot able to delete please try again later"})
                }else{
                    res.status(200).json({message:"deleted successfully"})
                }
            } catch (error:any) {
                res.status(400).json({error:error.message})
            }
        }
    }
    public BulkDeleteUsers = async(req:Request,res:Response) => {
        let {ids} = req.body
        if(ids == null || ids == undefined){
            res.status(400).json({error:"Please provide the id to delete"});
        }else{
            let success :Array<string> = []
            let errors :Array<string> = []
            if(ids.length > 0){
                try {
                    for await(let id of ids){
                        let user = await this.user_service.GetUserById(id)
                        if(user != null || user != undefined){
                            let response = await this.user_service.DeleteUser(id);
                            if(response){
                                success.push(`${user.subject} Deleted Successfully`)
                            }else{
                                errors.push(`${user.subject} Cannot deleted please try again`)
                            }
                        }
                    }
                    if(errors.length > 0 && success.length > 0){
                        res.status(400).json({success:success , errors:errors , message:"Some users cannot be deleted !!!!"})
                    }else if(success.length > 0 && errors.length == 0){
                        res.status(200).json({success:success , errors:errors , message:"All users Deleted Successfully !!!!"})
                    }else{
                        res.status(400).json({success:success , errors:errors , message:"Couldn't Delete any of the users !!!!"})
                    }
                } catch (error:any) {
                    console.log(error)
                    res.status(400).json({error:error})
                }
            }else{
                res.status(400).json({error:"Please provide id to delete"});
            }
        }
    
    }
    private CreateUserData = async (userData:users)=>{
        let user ={
            name :userData.name,
            surname: userData.surname,
            personal_title :userData.personal_title,
            work_title: userData.work_title,
            email :userData.email,
            role_id :userData.role_id,
            company_id :userData.company_id,
            status: userData.status,
            mobile_phone: userData.mobile_phone,
            office_phone :userData.office_phone,
            profile_image :userData.profile_image,
            password: userData.password,
            TwoFactorAuthentication: userData.TwoFactorAuthentication,
            TwoFactorForced :userData.TwoFactorForced,
            TwoFactorAuthenticationSecret :userData.TwoFactorAuthenticationSecret,
            emailConfirmed :userData.emailConfirmed,
            address :userData.address,
            adminConfirmed: userData.adminConfirmed,
            registered :userData.registered,
            accessFailedCount :userData.accessFailedCount,
            access_failed_restrict: userData.access_failed_restrict,
            is_deleted :userData.is_deleted,
            approved_by :userData.approved_by,
            approved_date: userData.approved_date,
            declined_by :userData.declined_by,
            declined_date: userData.declined_date,
            country_id : userData.country_id,
            state_id: userData.state_id,
            type: userData.type,
            city_id :userData.city_id,
            date_of_birth :userData.date_of_birth,
            zip_code :userData.zip_code
        }
        return user;
    }
    private getTimeStamp = () =>{
        return Math.floor(Date.now() / 1000)
    }
}

export default UserController