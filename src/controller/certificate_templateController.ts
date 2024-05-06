import Certificate_templateServiceImplementation from "../service/implementation/certificate_templateServiceImplementation";
import { Response,Request } from "express";

class Certificate_templateController{
    Certificate_template_service: Certificate_templateServiceImplementation

    constructor(){
        this.Certificate_template_service= new Certificate_templateServiceImplementation();
    }
    public CreateCertificate_template = async(req:Request,res:Response)=>{
        let Certificate_templateData =req.body
        if(Certificate_templateData == null || Certificate_templateData == undefined){
            res.status(400).json({error:"please provide the data"})
        }else{
            try {
                let Certificate_templateResponse = await this.Certificate_template_service.CreateCertificate_template(Certificate_templateData) 
                if(Certificate_templateResponse == 0){
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
    public UpdateCertificate_template = async(req:Request,res:Response)=>{
        let id = req.params.id
        let Certificate_templateData = req.body
        if(id == null || id == undefined){
            res.status(400).json({error:"please provide id"})
        }else{
            try {
                let isExist = await this.Certificate_template_service.GetCertificate_templateById(id)
                if(isExist == null || isExist == undefined){
                    res.status(400).json({error: "please select Certificate_template properly"})
                }else{
                    let Certificate_templateResponse = await this.Certificate_template_service.UpdateCertificate_template(id,Certificate_templateData)
                    if(Certificate_templateResponse > 0 ){
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
    public GetCertificate_templateById = async (req : Request,res:Response) => {
        let id = req.params.id;
        if(id == null || id == undefined){
            res.status(404).json({error:"please provide id"})
        }else{
            try {
                let Certificate_templateResponse = await this.Certificate_template_service.GetCertificate_templateById(id);
                if(Certificate_templateResponse == null || Certificate_templateResponse == undefined){
                    res.status(400).json({error:"No Certificate_template Exists"});
                }
                else{
                    res.status(200).json({data: Certificate_templateResponse});
                }
            } catch (error : any) {
                res.status(400).json({error:error.message});
            }
        }
    }
    public GetAllCertificate_templates = async (req : Request,res:Response) => {
        let page = Number(req.query.page );
        let limit = Number(req.query.limit);
        try {
            let Certificate_templateResponse :{count : number,rows:object[]} | {error ?: string ,status?:number } = await this.Certificate_template_service.GetAllCertificate_templates(page,limit);
            if(Certificate_templateResponse == null || Certificate_templateResponse == undefined || page == undefined || limit == undefined||page == null || limit == null){
                res.status(200).json({data:Certificate_templateResponse});
            }else{
                res.status(200).json({data : Certificate_templateResponse});
            }
        } catch (error:any) {
            res.status(400).json({error:error.message});
        }
    }
    public DeleteCertificate_template = async(req:Request,res:Response)=>{
        let id = req.params.id
        if(id == null || id == undefined){
            res.status(400).json({error:"please provide id"})
        }else{
            try {
                let Certificate_templateResponse = await this.Certificate_template_service.DeleteCertificate_template(id)
                if(Certificate_templateResponse == 0){
                    res.status(400).json({error:"couldnot able to delete please try again later"})
                }else{
                    res.status(200).json({message:"deleted successfully"})
                }
            } catch (error:any) {
                res.status(400).json({error:error.message})
            }
        }
    }
    public BulkDeleteCertificate_templates = async(req:Request,res:Response) => {
        let {ids} = req.body
        if(ids == null || ids == undefined){
            res.status(400).json({error:"Please provide the id to delete"});
        }else{
            let success :Array<string> = []
            let errors :Array<string> = []
            if(ids.length > 0){
                try {
                    for await(let id of ids){
                        let Certificate_template = await this.Certificate_template_service.GetCertificate_templateById(id)
                        if(Certificate_template != null || Certificate_template != undefined){
                            let response = await this.Certificate_template_service.DeleteCertificate_template(id);
                            if(response){
                                success.push(`${Certificate_template} Deleted Successfully`)
                            }else{
                                errors.push(`${Certificate_template} Cannot deleted please try again`)
                            }
                        }
                    }
                    if(errors.length > 0 && success.length > 0){
                        res.status(400).json({success:success , errors:errors , message:"Some Certificate_templates cannot be deleted !!!!"})
                    }else if(success.length > 0 && errors.length == 0){
                        res.status(200).json({success:success , errors:errors , message:"All Certificate_templates Deleted Successfully !!!!"})
                    }else{
                        res.status(400).json({success:success , errors:errors , message:"Couldn't Delete any of the Certificate_templates !!!!"})
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

export default Certificate_templateController