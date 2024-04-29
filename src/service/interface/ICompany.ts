import { companies } from "@prisma/client";

interface ICompanyService{
    CreateCompany (CompanyData:companies):Promise<companies>

    UpdateCompany(id:string,CompanyData:companies):Promise<companies>

    GetAllCompanies(page:number,limit:number,keyword:string,filterBy:string):Promise<{count:number,rows:Array<companies>}>

    GetCompanyById(id:string):Promise<companies>

    GetCompanyByEmail(email:string) :Promise<companies>
    
    DeleteCompany(id:string):Promise<companies>
}

export default ICompanyService