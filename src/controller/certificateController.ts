import { $Enums, certificate_status } from "@prisma/client";
import CertificateServiceImplementation from "../service/implementation/certificateServiceImplementation";
import { Response,Request } from "express";
import trainingServiceImplementation from "../service/implementation/trainingServiceImplementation";
import UserServiceImplementation from "../service/implementation/UserServiceImplementation";
import Certificate_templateServiceImplementation from "../service/implementation/certificate_templateServiceImplementation";
import CompanyServiceImplementation from "../service/implementation/companyServiceImplementation";
import { Readable } from "nodemailer/lib/xoauth2";
import fs from "fs"
import moment from "moment";
import { error } from "console";
import PuppePdf from "puppe-pdf";

class CertificateController{
    Certificate_service: CertificateServiceImplementation
    trainingService: trainingServiceImplementation;
    userService: UserServiceImplementation;
    templateService: Certificate_templateServiceImplementation;
    companyService: CompanyServiceImplementation;
    

    constructor(){
        this.Certificate_service= new CertificateServiceImplementation();
        this.trainingService = new trainingServiceImplementation()
        this.userService = new UserServiceImplementation()
        this.templateService = new Certificate_templateServiceImplementation()
        this.companyService = new CompanyServiceImplementation()
    }

    public CreateCertificate = async(req:Request,res:Response)=>{
        let CertificateData = req.body
        let user_id = req.user.id as string
        let destination = "src/upload/certificatess"
        if(CertificateData == null || CertificateData == undefined){
            res.status(400).json({error:"please provide the data"})
        }else{
            try {
                if(CertificateData.training_id != null){
                    let training = await this.trainingService.GetTrainingById(CertificateData.training_id);
                    if(training){
                        if(CertificateData.user_id){
                            let user = await this.userService.GetUserById(CertificateData.user_id);
                            if(user){
                                if(CertificateData.company_id){
                                    let company = await this.companyService.GetCompanyById(CertificateData.company_id);
                                    if(company){
                                        if(CertificateData.template_id){
                                            let certificate_number = await this.CertificteNumber();
                                            let template = await this.templateService.GetCertificate_templateById(CertificateData.template_id);
                                            if(template){
                                                CertificateData = JSON.parse(JSON.stringify(CertificateData))
                                                let html_string = await template.html_code.toString()
                                                html_string = html_string.replace("{{engineer}}", CertificateData.user_name);
                                                html_string = html_string.replace("{{company}}", CertificateData.company_name);
                                                html_string = html_string.replace("{{Training}}", training.subject);
                                                html_string = html_string.replace("{{validTo}}", moment(CertificateData.valid_to).format('YYYY-MM-DD'));
                                                html_string = html_string.replace("{{issueDate}}", moment(CertificateData.issued_date).format('YYYY-MM-DD'));
                                                html_string = html_string.replace("{{certificateNumber}}", certificate_number);

                                                
                                                CertificateData["certificate_no"] = String(certificate_number)
                                                CertificateData["issued_by"] = user_id
                                                console.log(CertificateData)
                                                let data = await this.Certificate_service.CreateCertificate(CertificateData);
                                                if(data){
                                                    let pdf_buffer = await PuppePdf.forgePDF(html_string)
                                                    let stream = Readable.from(pdf_buffer);
                                                    let filename = template.name.replaceAll(" ","_");
                                                    let filePath = `${destination}/${filename+"_"+this.getTimeStamp()+".pdf"}`
                                                    let writer = fs.createWriteStream(filePath);
                                                    stream.pipe(writer);
                                                    res.status(200).json({message:"Certificate created successfully"})
                                                }else{
                                                    res.status(400).json({message:"Certificate cannot be created please try again"})
                                                }
                                            }else{
                                                res.status(400).json({error:"please select template properly, no such template exist"});                
                                            }
                                        }else{
                                            res.status(400).json({error:"please select template properly"});            
                                        }
                                    }else{
                                        res.status(400).json({error:"please select company properly no such company exist"});            
                                    }  
                                }else{
                                    res.status(400).json({error:"please select company to create certificate"});        
                                }
                            }else{
                                res.status(400).json({error:"no such user exists please select user properly"});        
                            }     
                        }else{
                            res.status(400).json({error:"please select user to create certificate"});        
                        }
                    }else{
                        res.status(400).json({error:"no such training exists please select training properly"});    
                    }
                }else{
                    res.status(400).json({error:"please select training to create certificate"});
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
    public UpdateCertificate = async (req: Request, res: Response) => {
    let id = req.params.id;
    let CertificateData = req.body;
    let destination = "src/upload/certificatess";
    if (id == undefined  || id == null) {
        res.status(400).json({ error: "Please provide id" });
    } else {
        try {
            let isExist = await this.Certificate_service.GetCertificateById(id);
            if (isExist) {
                if (CertificateData.training_id) {
                    let training = await this.trainingService.GetTrainingById(CertificateData.training_id);
                    if (training) {
                        if (CertificateData.user_id) {
                            let user = await this.userService.GetUserById(CertificateData.user_id);
                            if (user) {
                                if (CertificateData.company_id) {
                                    let company = await this.companyService.GetCompanyById(CertificateData.company_id);
                                    if (company) {
                                        if (CertificateData.template_id) {
                                            let template = await this.templateService.GetCertificate_templateById(CertificateData.template_id);
                                            if (template) {
                                                CertificateData = JSON.parse(JSON.stringify(CertificateData));

                                                let html_string = await template.html_code.toString();
                                                html_string = html_string.replace("{{engineer}}", CertificateData.user_name);
                                                html_string = html_string.replace("{{company}}", CertificateData.company_name);
                                                html_string = html_string.replace("{{Training}}", training.subject);
                                                html_string = html_string.replace("{{validTo}}", moment(CertificateData.valid_to).format("YYYY-MM-DD"));
                                                html_string = html_string.replace("{{issueDate}}", moment(CertificateData.issued_date).format("YYYY-MM-DD"));
                                                html_string = html_string.replace("{{certificateNumber}}", isExist.certificate_no);

                                                let updatedCertificate = await this.Certificate_service.UpdateCertificate(id, CertificateData);
                                                if (updatedCertificate) {
                                                    let buffer = Buffer.from(html_string);
                                                    let stream = Readable.from(buffer);
                                                    let filename = template.name.replaceAll(" ", "_");
                                                    let filePath = `${destination}/${filename + "_" + this.getTimeStamp() + ".html"}`;
                                                    let writer = fs.createWriteStream(filePath);
                                                    stream.pipe(writer);

                                                    res.status(200).json({ message: "Certificate updated successfully" });
                                                } else {
                                                    res.status(400).json({ error: "Certificate could not be updated" });
                                                }
                                            } else {
                                                res.status(400).json({ error: "No such template exists. Please select template properly" });
                                            }
                                        } else {
                                            res.status(400).json({ error: "Please select template to update certificate" });
                                        }
                                    } else {
                                        res.status(400).json({ error: "No such company exists. Please select company properly" });
                                    }
                                } else {
                                    res.status(400).json({ error: "Please select company to update certificate" });
                                }
                            } else {
                                res.status(400).json({ error: "No such user exists. Please select user properly" });
                            }
                        } else {
                            res.status(400).json({ error: "Please select user to update certificate" });
                        }
                    } else {
                        res.status(400).json({ error: "No such training exists. Please select training properly" });
                    }
                } else {
                    res.status(400).json({ error: "Please select training to update certificate" });
                }
            } else {
                res.status(404).json({ error: "Certificate not found" });
            }
        } catch (error: any) {
            if (error.errors) {
                let validationerror = [];
                for await (let response of error.errors) {
                    let obj: { path: string; message: string } = {
                        path: "",
                        message: "",
                    };
                    obj.path = response.path;
                    obj.message = response.message;
                    validationerror.push(obj);
                }
                res.status(400).json({ errors: validationerror });
            } else {
                res.status(400).json({ error: error.message });
            }
        }
    }
};


    public UpdateCertificateStatus = async(req:Request,res:Response)=>{
        let id = req.params.id;
        let certificate_status = req.body.status as certificate_status;
        if(id == null || id ==undefined|| id ==":id"){
            res.status(404).json({error:"please provide id"})
        }else{
            try{
                let validateStatus =  ["valid","invalid","cancelled"]
                if(validateStatus.includes(certificate_status)){
                    let CertificateResponse = await this.Certificate_service.UpdateCertificateStatus(id,certificate_status);
                    if(CertificateResponse == null || CertificateResponse == undefined){
                        res.status(400).json({error:"Something went wrong please try again"});
                    }else{
                        res.status(200).json({message:`Status Updated Successfully`});
                    }
                }else{
                    res.status(400).json({error:"Please provide valid status"})
                }
            }catch ( error: any ) {
                if(error.errors){
                    let validationerror : Array<object> = [];
                    for await(let response of error.errors){
                        let obj:{path : string , message : string}={
                            path: "",
                            message: ""
                        }
                        obj.path = response.path;
                        obj.message = response.message;
                        validationerror.push(obj);
                    }
                    res.status(400).json({errors:validationerror})
                }else{
                    res.status(400).json({errors:error.message})
                }
            }
        }
    }

    public GetCertificateById = async (req : Request,res:Response) => {
        let id = req.params.id;
        if(id == null || id == undefined){
            res.status(404).json({error:"please provide id"})
        }else{
            try {
                let CertificateResponse = await this.Certificate_service.GetCertificateById(id);
                if(CertificateResponse == null || CertificateResponse == undefined){
                    res.status(400).json({error:"No Certificate Exists"});
                }
                else{
                    res.status(200).json({data: CertificateResponse});
                }
            } catch (error : any) {
                res.status(400).json({error:error.message});
            }
        }
    }
    public GetAllCertificates = async (req : Request,res:Response) => {
        let page = Number(req.query.page );
        let limit = Number(req.query.limit);
        let keyword  = req.query.keyword as string
        let filterBy = req.query.filterBy as $Enums.certificate_status 
        keyword = keyword == null || keyword == undefined ? "": keyword
        try {
            let CertificateResponse :{count : number,rows:object[]} | {error ?: string ,status?:number } = await this.Certificate_service.GetAllCertificates(page,limit,keyword,filterBy);
            if(CertificateResponse == null || CertificateResponse == undefined || page == undefined || limit == undefined||page == null || limit == null){
                res.status(200).json({data:CertificateResponse});
            }else{
                res.status(200).json({data : CertificateResponse});
            }
        } catch (error:any) {
            res.status(400).json({error:error.message});
        }
    }
    public GetCertificateByUserId = async(req:Request,res:Response)=>{
        let userId = req.params.userId
        if(userId == null || userId == undefined){
            res.status(400).json({error:"please provide userid"})
        }else{
            try {
                let certificateData = await this.Certificate_service.GetCertificateByUserId(userId)
                if(certificateData == null || certificateData == undefined){
                    res.status(400).json({error:"No Certificate Exists"}); 
                }else{
                    res.status(200).json({data: certificateData});
                }
            } catch (error:any) {
                res.status(400).json({error:error.message})
            }
        }
    }

    public GetCertificateByCompanyId = async(req:Request,res:Response)=>{
        let company_id = req.params.company_id
        if(company_id == null || company_id == undefined){
            res.status(400).json({error:"please provide userid"})
        }else{
            try {
                let certificateData = await this.Certificate_service.GetCertificateByCompanyId(company_id)
                if(certificateData == null || certificateData == undefined){
                    res.status(400).json({error:"No Certificate Exists"}); 
                }else{
                    res.status(200).json({data: certificateData});
                }
            } catch (error:any) {
                res.status(400).json({error:error.message})
            }
        }
    }

    public DeleteCertificate = async(req:Request,res:Response)=>{
        let id = req.params.id
        if(id == null || id == undefined){
            res.status(400).json({error:"please provide id"})
        }else{
            try {
                let CertificateResponse = await this.Certificate_service.DeleteCertificate(id)
                if(CertificateResponse == 0){
                    res.status(400).json({error:"couldnot able to delete please try again later"})
                }else{
                    res.status(200).json({message:"deleted successfully"})
                }
            } catch (error:any) {
                res.status(400).json({error:error.message})
            }
        }
    }
    public BulkDeleteCertificates = async(req:Request,res:Response) => {
        let {ids} = req.body
        if(ids == null || ids == undefined){
            res.status(400).json({error:"Please provide the id to delete"});
        }else{
            let success :Array<string> = []
            let errors :Array<string> = []
            if(ids.length > 0){
                try {
                    for await(let id of ids){
                        let Certificate = await this.Certificate_service.GetCertificateById(id)
                        if(Certificate != null || Certificate != undefined){
                            let response = await this.Certificate_service.DeleteCertificate(id);
                            if(response){
                                success.push(`${Certificate} Deleted Successfully`)
                            }else{
                                errors.push(`${Certificate} Cannot deleted please try again`)
                            }
                        }
                    }
                    if(errors.length > 0 && success.length > 0){
                        res.status(400).json({success:success , errors:errors , message:"Some Certificates cannot be deleted !!!!"})
                    }else if(success.length > 0 && errors.length == 0){
                        res.status(200).json({success:success , errors:errors , message:"All Certificates Deleted Successfully !!!!"})
                    }else{
                        res.status(400).json({success:success , errors:errors , message:"Couldn't Delete any of the Certificates !!!!"})
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

    public RenewCertificates = async(req:Request,res:Response) => {
        let id = req.params.id;
        if(id == null || id == undefined){
            res.status(400).json({error:"id provide"})
        }else{

        }
    }

    private CertificteNumber = async() => {
        return Math.floor(1000000000 + Math.random() * 9000000000);
    }

    private getTimeStamp = () =>{
        return Math.floor(Date.now() / 1000)
    }
}

export default CertificateController