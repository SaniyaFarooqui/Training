import { $Enums, certificate_status, certificates, Prisma, status } from "@prisma/client";


interface ICertificateService{

    CreateCertificate(certificateData: certificates):Promise<certificates>

    UpdateCertificate(id:string,certificateData:certificates):Promise<certificates>

    UpdateCertificateStatus (id:string,certificate_status:certificate_status):Promise<certificates |{error:string, status:number}|undefined>

    GetAllCertificates(page:number,limit:number,keyword:string,filterBy: $Enums.certificate_status ):Promise<{count:number,rows:Array<certificates>}>

    GetAllCertificateForCron():Promise<Prisma.certificatesGetPayload<{select:{id:true,certificate_name:true,user_name:true,company_name:true,start_date:true,end_date:true}}>[]|undefined>

    GetCertificateById(id:string):Promise<certificates>

    GetCertificateByUserId(userId:string):Promise<certificates>

    GetCertificateByCompanyId(company_id:string):Promise<certificates>
    
    DeleteCertificate(id:string):Promise<certificates>
}

export default ICertificateService