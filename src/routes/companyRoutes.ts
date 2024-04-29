import { Router } from "express";
import CompanyController from "../controller/companyController";

let companyController = new CompanyController ();
let companyRouter :Router = Router();

companyRouter.post("/CreateCompany",companyController.CreateCompany);
companyRouter.put("/UpdateCompany/:id",companyController.UpdateCompany)
companyRouter.get("/GetCompanyById/:id",companyController.GetCompanyById)
companyRouter.get("/GetAllCompanies",companyController.GetAllCompanies)
companyRouter.delete("/DeleteCompany/:id",companyController.DeleteCompany)
companyRouter.delete("/BulkDeleteCompanies",companyController.BulkDeleteCompanies)

export default companyRouter;