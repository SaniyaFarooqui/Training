import ICertificateService from "../interface/ICertificate";
import CertificatesRepository from "../../repository/certificates";
import { certificates } from "@prisma/client";


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

    public GetAllCertificates = async(page:number,limit:number) :Promise<{count:number,rows:Array<certificates>}|any> => {
        if(page == null || page == undefined || limit == null || limit == undefined || page == 0 || limit == 0){
            page = 1;
            limit = 10;
        }
        let offset = (page - 1) * limit;
        let response = await this.repository?.GetAllCertificates(offset,limit);
        return response;
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