import { Router } from "express";
import DepartmentController from "../controller/departmentController";

let departmentController = new DepartmentController();
let DepartmentRouter: Router = Router();

DepartmentRouter.post("/CreateDepartment",departmentController.CreateDepartment)
DepartmentRouter.put("/UpdateDepartment/:id",departmentController.UpdateDepartment)
DepartmentRouter.get("/UpdateDepartment",departmentController.GetAllDepartments)
DepartmentRouter.get("/GetDepartmentById/:id",departmentController.GetDepartmentById)
DepartmentRouter.delete("/DeleteDepartment/:id",departmentController.DeleteDepartment)
DepartmentRouter.delete("/BulkDeleteDepartments",departmentController.BulkDeleteDepartments)

export default DepartmentRouter;
