import { $Enums, certificates } from "@prisma/client";


interface ICertificateService{

    CreateCertificate(certificateData: certificates):Promise<certificates>

    UpdateCertificate(id:string,certificateData:certificates):Promise<certificates>

    GetAllCertificates(page:number,limit:number,keyword:string,filterBy: $Enums.certificate_status ):Promise<{count:number,rows:Array<certificates>}>

    GetCertificateById(id:string):Promise<certificates>
    
    DeleteCertificate(id:string):Promise<certificates>
}

export default ICertificateService