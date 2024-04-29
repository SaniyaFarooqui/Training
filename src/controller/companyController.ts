import CompanyServiceImplementation from "../service/implementation/companyServiceImplementation";
import { Response,Request } from "express";

class CompanyController{
    Company_service: CompanyServiceImplementation

    constructor(){
        this.Company_service= new CompanyServiceImplementation();
    }
    public CreateCompany = async(req:Request,res:Response)=>{
        let CompanyData =req.body
        if(CompanyData.name == null || CompanyData.name == undefined|| CompanyData.email == null || CompanyData.email == undefined){
            res.status(400).json({error:"please provide the data"})
        }else{
            try {
                let isExist = await this.Company_service.GetCompanyByEmail(CompanyData.email)
                if(isExist == null){
                    let CompanyResponse = await this.Company_service.CreateCompany(CompanyData) 
                    if(CompanyResponse == 0){
                        res.status(400).json({error:"couldnot able to create please try again"})
                    }else{
                        res.status(200).json({message:"created successfully"})
                    }
                }else{
                    res.status(400).json({error:`${CompanyData.email} already exists please try different email`})
                }
                
            } catch (error:any) { 
                if(error.errors){
                    let validationerror = []
                    for await(let response of error.errors){
                        let obj :{path : string,message : string} = {
                            path: "",
                            message: ""
                        };
                        obj.path = response.path,
                        obj.message = response.message
                        validationerror.push(obj);
                    }
                    res.status(400).json({errors : validationerror});
                }else{
                    res.status(400).json({errors : error.message});
                }
            }
        }
    }
    public UpdateCompany = async(req:Request,res:Response)=>{
        let id = req.params.id
        let CompanyData = req.body
        if(id == null || id == undefined){
            res.status(400).json({error:"please provide id"})
        }else{
            try {
                let isExist = await this.Company_service.GetCompanyById(id)
                if(isExist == null || isExist == undefined){
                    res.status(400).json({error: "please select Company properly"})
                }else{
                    let CompanyResponse = await this.Company_service.UpdateCompany(id,CompanyData)
                    if(CompanyResponse > 0 ){
                        res.status(200).json({message: "updated successfully"})
                    }else{
                        res.status(400).json({error: "could not able to update"})
                    }
                }
            } catch (error:any) {
                if(error.errors){
                    let validationerror = []
                    for await(let response of error.errors){
                        let obj :{path : string,message : string} = {
                            path: "",
                            message: ""
                        };
                        obj.path = response.path,
                        obj.message = response.message
                        validationerror.push(obj);
                    }
                    res.status(400).json({errors : validationerror});
                }else{
                    res.status(400).json({errors : error.message});
                }
            }
        }
    }
    public GetCompanyById = async (req : Request,res:Response) => {
        let id = req.params.id;
        if(id == null || id == undefined){
            res.status(404).json({error:"please provide id"})
        }else{
            try {
                let CompanyResponse = await this.Company_service.GetCompanyById(id);
                if(CompanyResponse == null || CompanyResponse == undefined){
                    res.status(400).json({error:"No Company Exists"});
                }
                else{
                    res.status(200).json({data: CompanyResponse});
                }
            } catch (error : any) {
                res.status(400).json({error:error.message});
            }
        }
    }
    public GetAllCompanies = async (req : Request,res:Response) => {
        let page = req.query.page as unknown as number;
        let limit = req.query.limit as unknown as number;
        let keyword = req.query.keyword as string;
        let filterBy =req.query.filterBy as string;
        keyword = keyword == null || keyword == undefined ? "": keyword
        try {
            let CompanyResponse :{count : number,rows:object[]} | {error ?: string ,status?:number } = await this.Company_service.GetAllCompanies(page,limit,keyword,filterBy);
            console.log(CompanyResponse)
            if(CompanyResponse == null || CompanyResponse == undefined || page == undefined || limit == undefined||page == null || limit == null){
                res.status(200).json({data:CompanyResponse});
            }else{
                res.status(200).json({data : CompanyResponse});
            }
        } catch (error:any) {
            res.status(400).json({error:error.message});
        }
    }
    public DeleteCompany = async(req:Request,res:Response)=>{
        let id = req.params.id
        if(id == null || id == undefined){
            res.status(400).json({error:"please provide id"})
        }else{
            try {
                let CompanyResponse = await this.Company_service.DeleteCompany(id)
                if(CompanyResponse == 0){
                    res.status(400).json({error:"couldnot able to delete please try again later"})
                }else{
                    res.status(200).json({message:"deleted successfully"})
                }
            } catch (error:any) {
                res.status(400).json({error:error.message})
            }
        }
    }
    public BulkDeleteCompanies = async(req:Request,res:Response) => {
        let {ids} = req.body
        if(ids == null || ids == undefined){
            res.status(400).json({error:"Please provide the id to delete"});
        }else{
            let success :Array<string> = []
            let errors :Array<string> = []
            if(ids.length > 0){
                try {
                    for await(let id of ids){
                        let Company = await this.Company_service.GetCompanyById(id)
                        if(Company != null || Company != undefined){
                            let response = await this.Company_service.DeleteCompany(id);
                            if(response){
                                success.push(`${Company.subject} Deleted Successfully`)
                            }else{
                                errors.push(`${Company.subject} Cannot deleted please try again`)
                            }
                        }
                    }
                    if(errors.length > 0 && success.length > 0){
                        res.status(400).json({success:success , errors:errors , message:"Some Companys cannot be deleted !!!!"})
                    }else if(success.length > 0 && errors.length == 0){
                        res.status(200).json({success:success , errors:errors , message:"All Companys Deleted Successfully !!!!"})
                    }else{
                        res.status(400).json({success:success , errors:errors , message:"Couldn't Delete any of the Companys !!!!"})
                    }
                } catch (error:any) {
                    console.log(error)
                    res.status(400).json({error:error})
                }
            }else{
                res.status(400).json({error:"Please provide id to delete"});
            }
        }
    
    }
}

export default CompanyController