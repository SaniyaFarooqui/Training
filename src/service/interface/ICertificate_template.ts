import { certificate_templates, Prisma } from "@prisma/client";


interface ICertificate_templateService{

    CreateCertificate_template(certificate_templateData: certificate_templates):Promise<certificate_templates>

    UpdateCertificate_template(id:string,certificate_templateData:certificate_templates):Promise<certificate_templates>

    GetAllCertificate_templates(page:number,limit:number):Promise<Prisma.certificate_templatesGetPayload<{select:{id:true,filename:true,mimetype:true,name:true,createdAt:true,size:true,encoding:true,updatedAt:true}}>[]|undefined|null|certificate_templates>

    GetCertificate_templateByName(name:string) :Promise< certificate_templates|any >

    GetCertificate_templateById(id:string):Promise<certificate_templates>
    
    DeleteCertificate_template(id:string):Promise<certificate_templates>
}

export default ICertificate_templateService