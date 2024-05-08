import { Router } from "express";
import Certificate_templateController from "../controller/certificate_templateController";
import multer = require("multer");

let upload = multer({
    storage:multer.memoryStorage()
})


let certificate_templateController = new Certificate_templateController();
let Certificate_templateRouter :Router = Router();

Certificate_templateRouter.post("/CreateCertificate_template",upload.single("file"),certificate_templateController.CreateCertificate_template)
Certificate_templateRouter.put("/UpdateCertificate_template/:id",upload.single("file"),certificate_templateController.UpdateCertificate_template)
Certificate_templateRouter.get("/GetAllCertificate_templates",certificate_templateController.GetAllCertificate_templates)
Certificate_templateRouter.get("/GetCertificate_templateById/:id",certificate_templateController.GetCertificate_templateById)
Certificate_templateRouter.delete("/DeleteCertificate_template/:id",certificate_templateController.DeleteCertificate_template)
Certificate_templateRouter.delete("/BulkDeleteCertificate_templates",certificate_templateController.BulkDeleteCertificate_templates)

export default Certificate_templateRouter