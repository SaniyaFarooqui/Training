import ICertificate_templateService from "../interface/ICertificate_template";
import Certificate_templatesRepository from "../../repository/certificate_template";
import { certificate_templates } from "@prisma/client";


class Certificate_templateServiceImplementation implements ICertificate_templateService{
    
    repository:Certificate_templatesRepository | undefined;
    
    constructor(){
        this.repository = new Certificate_templatesRepository()
    }

    public CreateCertificate_template = async(Certificate_templateData: certificate_templates): Promise<certificate_templates|any> =>{
        if (Certificate_templateData == null || Certificate_templateData == undefined){
            return{error:"data is required",status:400}
        }else{
            let response = await this.repository?.CreateCertificate_template(Certificate_templateData)
            return response
        }
    }

    public UpdateCertificate_template = async(id:string,Certificate_templateData:certificate_templates) :Promise<certificate_templates|any> => {
        if(id == null || id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository?.UpdateCertificate_template(id,Certificate_templateData);
            return response
        }
    }

    public GetAllCertificate_templates = async(page:number,limit:number) :Promise<{count:number,rows:Array<certificate_templates>}|any> => {
        if(page == null || page == undefined || limit == null || limit == undefined || page == 0 || limit == 0){
            page = 1;
            limit = 10;
        }
        let offset = (page - 1) * limit;
        let response = await this.repository?.GetAllCertificate_templates(offset,limit);
        return response;
    }

    public GetCertificate_templateByName = async(name:string) :Promise< certificate_templates|any > => {
        if(name !== null ||name !== undefined){
            let response = await this.repository?.GetCertificate_templateByName(name)
            return response
        }else{
            let data = {error:"id is required",status:400}
            return data
            
        }
    }

    public GetCertificate_templateById = async(id:string) :Promise< certificate_templates|any > => {
        if(id !== null ||id !== undefined || id !== ":id"){
            let response = await this.repository?.GetCertificate_templateById(id);
            return response
        }else{
            let data = {error:"id is required",status:400}
            return data
            
        }
    }

    public DeleteCertificate_template = async(id:string) :Promise<certificate_templates|any> => {
        if(id == null || id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository?.DeleteCertificate_template(id);
            return response;
        }
    }
}
export default Certificate_templateServiceImplementation