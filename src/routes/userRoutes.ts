import UserController from "../controller/usersController";
import { Router } from "express";


let userController= new UserController();
let UserRouter :Router = Router();

UserRouter.post("/CreateUser",userController.CreateUser)
UserRouter.put("/UpdateUser/:id",userController.UpdateUser)
UserRouter.get("/GetAllUsers",userController.GetAllUsers)
UserRouter.get("/GetUserById/:id",userController.GetUserById)
UserRouter.delete("/DeleteUser/:id",userController.DeleteUser)
UserRouter.delete("/BulkDeleteUsers",userController.BulkDeleteUsers)

export default UserRouter