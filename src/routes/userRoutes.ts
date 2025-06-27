import UserController from "../controller/usersController";
import { Router } from "express";
import multer = require("multer");
import isAuthenticated from "../middlewares/authetication";
import { Request,Response} from "express";
import PermissonsRestrict from "../middlewares/permission";
import RolesRestrict from "../middlewares/roles";

let upload = multer({
    storage:multer.memoryStorage()
})


let userController= new UserController();
let UserRouter :Router = Router();

UserRouter?.get('/dashboard', isAuthenticated, (req:Request, res:Response) => {
  res.json({ message: `Welcome user ${req.user?.email}` });
});

UserRouter.post("/CreateUser",upload.single("profile_image"),isAuthenticated,RolesRestrict,PermissonsRestrict,userController.CreateUser)
UserRouter.post("/LoginController",userController.LoginController)
UserRouter.post("/RefreshToken/:token",userController.RefreshToken)
UserRouter.put("/UpdateUser/:id",upload.single("profile_image"),isAuthenticated,RolesRestrict,PermissonsRestrict,userController.UpdateUser)
UserRouter.get("/GetAllUsers",isAuthenticated,RolesRestrict,PermissonsRestrict,userController.GetAllUsers)
UserRouter.get("/GetUserByCompanyId/:company_id",isAuthenticated,RolesRestrict,PermissonsRestrict,userController.GetUserByCompanyId)
UserRouter.get("/GetUserById/:id",isAuthenticated,RolesRestrict,PermissonsRestrict,userController.GetUserById)
UserRouter.delete("/DeleteUser/:id",isAuthenticated,userController.DeleteUser)
UserRouter.delete("/BulkDeleteUsers",isAuthenticated,userController.BulkDeleteUsers)
UserRouter.delete("/LogoutController",userController.logoutController)

export default UserRouter