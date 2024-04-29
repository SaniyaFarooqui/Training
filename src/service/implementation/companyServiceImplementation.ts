import CompaniesRepository from "../../repository/companies";
import { $Enums, companies } from "@prisma/client";
import ICompanyService from "../interface/ICompany";
import { Count } from "@prisma/client/runtime/library";

class CompanyServiceImplementation implements ICompanyService{

    repository:CompaniesRepository | undefined;
    
    constructor(){
        this.repository = new CompaniesRepository()
    }

    public CreateCompany=async(CompanyData:companies):Promise<companies|any>=>{
        let response = await this.repository?.CreateCompany(CompanyData)
        return response 
    }
    
    public UpdateCompany= async (id: string, CompanyData:companies): Promise<companies|any>=>{
        if(id == null || id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository?.UpdateCompany(id,CompanyData);
            return response
        }
    }

    public GetAllCompanies = async(page:number,limit:number,keyword:string,filterBy:string) :Promise<{count:number,rows:Array<companies>}|any> => {
        if(page == null || page == undefined || limit == null || limit == undefined || page == 0 || limit == 0){
            page = 1;
            limit = 10;
        }
        let offset = (page - 1) * limit;
        let response = await this.repository?.GetAllCompanies(offset,limit,keyword,filterBy);
        return response;
    }

    public GetCompanyById = async(id:string) :Promise< companies|any > => {
        if(id !== null ||id !== undefined || id !== ":id"){
            let response = await this.repository?.GetCompanyById(id);
            return response
        }else{
            let data = {error:"id is required",status:400}
            return data
            
        }
    }

    public GetCompanyByEmail = async(email: string): Promise<companies>=> {
        let response = await this.repository?.GetCompanyByEmail(email);
        return response as companies;
       
    }

    public DeleteCompany = async(id:string) :Promise<companies|any> => {
        if(id == null || id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository?.DeleteCompany(id);
            return response;
        }
    }
}
export default CompanyServiceImplementation