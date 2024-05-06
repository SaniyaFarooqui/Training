import {PrismaClient } from "@prisma/client";
import { companies} from "@prisma/client";

class CompaniesRepository{
    prisma:PrismaClient
     
    constructor(){
        this.prisma = new PrismaClient()
    }

    public CreateCompany = async(CompanyData:companies):Promise<companies>=>{
        return await this.prisma.companies.create({data:CompanyData})
    }

    public UpdateCompany = async(id:string,CompanyData:companies):Promise<companies>=>{
        return await this.prisma.companies.update({where:{id:id},data:CompanyData})
    }

    public GetAllCompanies = async(page:number,limit:number,keyword:string,filterBy:string):Promise<{count:number,rows:Array<companies>}>=>{
        let Company = await this.prisma.companies.findMany({
            where:{
                OR:[
                    {
                        name:{
                            contains:keyword
                        }
                    }
                ],
                status:filterBy
            },
            skip:page,
            take:limit,
        })
        let count = await this.prisma.companies.count()
        return {count:count,rows:Company}
    }

    public GetCompanyById = async(id:string):Promise<companies|null>=>{
        return await this.prisma.companies.findUnique({
            where:{
                id:id
            }
        })
    }

    public GetCompanyByEmail = async (email:string) :Promise<object|null> => {
        return await this.prisma.companies.findFirst({
            where:{
                email:email
            }
        })
    }


    public DeleteCompany =async(id:string):Promise<companies>=>{
        return await this.prisma.companies.delete({
            where:{
                id:id
            }
        })
    }
}
export default CompaniesRepository