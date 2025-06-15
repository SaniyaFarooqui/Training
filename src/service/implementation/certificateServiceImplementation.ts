import ICertificateService from "../interface/ICertificate";
import CertificatesRepository from "../../repository/certificates";
import { $Enums, certificate_status, certificates, Prisma, status } from "@prisma/client";


class CertificateServiceImplementation implements ICertificateService{
    
    repository:CertificatesRepository | undefined;
    
    constructor(){
        this.repository = new CertificatesRepository()
    }

    public CreateCertificate = async(CertificateData: certificates): Promise<certificates|any> =>{
        if (CertificateData == null || CertificateData == undefined){
            return{error:"data is required",status:400}
        }else{
            let response = await this.repository?.CreateCertificate(CertificateData)
            return response
        }
    }

    public UpdateCertificate = async(id:string,CertificateData:certificates) :Promise<certificates|any> => {
        if(id == null || id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository?.UpdateCertificate(id,CertificateData);
            return response
        }
    }

    public UpdateCertificateStatus = async(id:string,certificate_status:certificate_status):Promise<certificates |{error:string, status:number}|undefined>=>{
        if(id == null || id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository?.UpdateCertificateStatus(id,certificate_status);
            return response
        }
    }

    public GetAllCertificates = async(page:number,limit:number,keyword:string,filterBy: $Enums.certificate_status ) :Promise<{count:number,rows:Array<certificates>}|any> => {
        if(page == null || page == undefined || limit == null || limit == undefined || page == 0 || limit == 0){
            page = 1;
            limit = 10;
        }
        let offset = (page - 1) * limit;
        let response = await this.repository?.GetAllCertificates(offset,limit,keyword,filterBy);
        return response;
    }

    public GetAllCertificateForCron = async():Promise<Prisma.certificatesGetPayload<{select:{id:true,certificate_name:true,user_name:true,company_name:true,start_date:true,end_date:true}}>[]|undefined>=>{
        let response= await this.repository?.GetAllCertificateForCron();
        return response
    }

    public GetCertificateById = async(id:string) :Promise< certificates|any > => {
        if(id !== null ||id !== undefined || id !== ":id"){
            let response = await this.repository?.GetCertificateById(id);
            return response
        }else{
            let data = {error:"id is required",status:400}
            return data
            
        }
    }

    public GetCertificateByUserId = async(userId:string):Promise<certificates|any>=>{
        if(userId == null || userId == undefined ){
            return {error : "userid is required",status:400}
        }else{
            let response = await this.repository?.GetCertificateByUserId(userId)
            return response
        }
    }

    public GetCertificateByCompanyId = async(company_id:string):Promise<certificates|any>=>{
        if(company_id == null || company_id == undefined ){
            return {error : "userid is required",status:400}
        }else{
            let response = await this.repository?.GetCertificateByCompanyId(company_id)
            return response
        }
    }

    public DeleteCertificate = async(id:string) :Promise<certificates|any> => {
        if(id == null || id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository?.DeleteCertificate(id);
            return response;
        }
    }
}
export default CertificateServiceImplementation