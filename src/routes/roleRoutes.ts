import { Router } from "express";
import RoleController from "../controller/rolesController";


let roleController= new RoleController();
let RoleRouter :Router = Router();

RoleRouter.post("/CreateRole",roleController.CreateRole)
RoleRouter.put("/UpdateRole/:id",roleController.UpdateRole)
RoleRouter.get("/GetAllRoles",roleController.GetAllRoles)
RoleRouter.get("/GetRoleById/:id",roleController.GetRoleById)
RoleRouter.delete("/DeleteRole/:id",roleController.DeleteRole)
RoleRouter.delete("/BulkDeleteRoles",roleController.BulkDeleteRoles)

export default RoleRouter