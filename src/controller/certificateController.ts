import CertificateServiceImplementation from "../service/implementation/certificateServiceImplementation";
import { Response,Request } from "express";

class CertificateController{
    Certificate_service: CertificateServiceImplementation

    constructor(){
        this.Certificate_service= new CertificateServiceImplementation();
    }
    public CreateCertificate = async(req:Request,res:Response)=>{
        let CertificateData =req.body
        if(CertificateData == null || CertificateData == undefined){
            res.status(400).json({error:"please provide the data"})
        }else{
            try {
                let CertificateResponse = await this.Certificate_service.CreateCertificate(CertificateData) 
                if(CertificateResponse == 0){
                    res.status(400).json({error:"couldnot able to create please try again"})
                }else{
                    res.status(200).json({message:"created successfully"})
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
    public UpdateCertificate = async(req:Request,res:Response)=>{
        let id = req.params.id
        let CertificateData = req.body
        if(id == null || id == undefined){
            res.status(400).json({error:"please provide id"})
        }else{
            try {
                let isExist = await this.Certificate_service.GetCertificateById(id)
                if(isExist == null || isExist == undefined){
                    res.status(400).json({error: "please select Certificate properly"})
                }else{
                    let CertificateResponse = await this.Certificate_service.UpdateCertificate(id,CertificateData)
                    if(CertificateResponse > 0 ){
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
        try {
            let CertificateResponse :{count : number,rows:object[]} | {error ?: string ,status?:number } = await this.Certificate_service.GetAllCertificates(page,limit);
            if(CertificateResponse == null || CertificateResponse == undefined || page == undefined || limit == undefined||page == null || limit == null){
                res.status(200).json({data:CertificateResponse});
            }else{
                res.status(200).json({data : CertificateResponse});
            }
        } catch (error:any) {
            res.status(400).json({error:error.message});
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
}

export default CertificateController