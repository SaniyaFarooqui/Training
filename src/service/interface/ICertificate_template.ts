import { certificate_templates } from "@prisma/client";


interface ICertificate_templateService{

    CreateCertificate_template(certificate_templateData: certificate_templates):Promise<certificate_templates>

    UpdateCertificate_template(id:string,certificate_templateData:certificate_templates):Promise<certificate_templates>

    GetAllCertificate_templates(page:number,limit:number):Promise<{count:number,rows:Array<certificate_templates>}>

    GetCertificate_templateById(id:string):Promise<certificate_templates>
    
    DeleteCertificate_template(id:string):Promise<certificate_templates>
}

export default ICertificate_templateService