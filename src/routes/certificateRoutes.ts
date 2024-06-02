import { Router } from "express";
import CertificateController from "../controller/certificateController";


let certificateController= new CertificateController();
let CertificateRouter :Router = Router();

CertificateRouter.post("/CreateCertificate",certificateController.CreateCertificate)
CertificateRouter.put("/UpdateCertificate/:id",certificateController.UpdateCertificate)
CertificateRouter.get("/GetAllCertificates",certificateController.GetAllCertificates)
CertificateRouter.get("/GetCertificateById/:id",certificateController.GetCertificateById)
CertificateRouter.get("/GetCertificateByUserId/:userId",certificateController.GetCertificateByUserId)
CertificateRouter.get("/GetCertificateByCompanyId/:company_id",certificateController.GetCertificateByCompanyId)
CertificateRouter.delete("/DeleteCertificate/:id",certificateController.DeleteCertificate)
CertificateRouter.delete("/BulkDeleteCertificates",certificateController.BulkDeleteCertificates)

export default CertificateRouter