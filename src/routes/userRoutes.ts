import multer from "multer";
import UserController from "../controller/usersController";
import { Router } from "express";


let userController= new UserController();
let UserRouter :Router = Router();

UserRouter.post("/CreateUser",userController.CreateUser)
UserRouter.post("/LoginController",userController.LoginController)
UserRouter.post("/RefreshToken/:token",userController.RefreshToken)
UserRouter.put("/UpdateUser/:id",userController.UpdateUser)
UserRouter.get("/GetAllUsers",userController.GetAllUsers)
UserRouter.get("/GetUserByCompanyId/:company_id",userController.GetUserByCompanyId)
UserRouter.get("/GetUserById/:id",userController.GetUserById)
UserRouter.delete("/DeleteUser/:id",userController.DeleteUser)
UserRouter.delete("/BulkDeleteUsers",userController.BulkDeleteUsers)
UserRouter.delete("/LogoutController",userController.logoutController)

export default UserRouter