import { PrismaClient } from '@prisma/client';
import type { Prisma, status } from '@prisma/client';
import trainingServiceImplementation from "../service/implementation/trainingServiceImplementation";
import { Request,Response } from "express";
import {trainings} from "../model/trainings"
import { Readable } from "stream";
import fs  from 'fs';
import Product_groupServiceImplementation from "../service/implementation/product_groupServiceImplementation";
import { product_groups } from "../model/product_groups";
import Product_group_trainingServiceImplementation from "../service/implementation/product_group_trainingServiceImplementation";
import Product_modelServiceImplementation from '../service/implementation/product_modelServiceImplementation';
import Product_model_trainingServiceImplementation from '../service/implementation/product_model_trainingServiceImplementation';

class trainingsController{

    training_service: trainingServiceImplementation
    product_group_service: Product_groupServiceImplementation;
    product_group_training_service : Product_group_trainingServiceImplementation;
    product_model_service : Product_modelServiceImplementation;
    product_model_training_service : Product_model_trainingServiceImplementation;

   public destination: string = "src/upload/training"
    
    
    constructor(){
        this.training_service = new trainingServiceImplementation();
        this.product_group_service = new Product_groupServiceImplementation()
        this.product_group_training_service = new Product_group_trainingServiceImplementation()
        this.product_model_service = new Product_modelServiceImplementation()
        this.product_model_training_service = new Product_model_trainingServiceImplementation()
    }

    public CreateTraining = async(req:Request,res:Response)=>{
        let trainingData = req.body
        let photo:any  = req.file;
        let success :Array<string> = []
        let errors :Array<string> = []
        
        if(trainingData == null || trainingData == undefined){
            res.status(400).json({error:"Data not found please fill the data"})
        }else{
            try {
                let trainingValues :trainings = await this.CreateTrainingData(trainingData);
                if(trainingValues){
                    if(photo == null||photo == undefined){
                        let trainingResponse: any = await this.training_service.CreateTraining(trainingValues);
                        if(trainingResponse == null || trainingResponse == undefined){
                            res.status(400).json({error:"training not created please try again"})
                        }else{
                            res.status(200).json({message:"Training created successfully"})
                        } 
                    }else{
                        if(photo.mimetype?.split("/")[1] == "jpg" || photo.mimetype?.split("/")[1] == "png" || photo.mimetype?.split("/")[1] == "jpeg"){
                            let stream = Readable.from(photo.buffer as Buffer);
                            let filename = photo.originalname?.replaceAll(" ","_");
                            let filePath = `${this.destination}/${filename?.split(".")[0]}_${this.getTimeStamp()}.${filename?.split(".")[1]}`;
                            let writer = fs.createWriteStream(filePath);
                            stream.pipe(writer);
                            let url = `${process.env.server}/${filePath}`;
                            console.log(url)
                            trainingValues["photo"] = url;
                            let response :trainings|any|{error:"data is required",status:400} = await this.training_service.CreateTraining(trainingValues);
                            console.log(response)
                            if(response.error && response.status){
                                res.status(400).json({error:response.error})
                            }else{
                                let product_group_training = JSON.parse(trainingData?.product_group_trainings)
                                if(Array.isArray(product_group_training)){
                                    for (let product of product_group_training){
                                        let validate :product_groups = await this.product_group_service.GetProduct_groupById(product);
                                        console.log(validate)
                                        if(validate != null || validate != undefined){
                                            let data = {
                                                id: trainingData.id,
                                                product_group_id:product,
                                                training_id:response.id,
                                                product_group_name: validate.name,
                                                createdAt: new Date(),
                                                updatedAt: new Date(),
                                            };
                                            let cratedData  = await this.product_group_training_service.CreateProduct_group_training(data);
                                            if(cratedData){
                                                success.push(`${validate.name} product group has been created`);
                                            }else{
                                                errors.push(`${validate.name} product group has not created`);    
                                            }
                                        }
                                    }
                                }

                                let product_model_trainings = JSON.parse(trainingData?.product_model_trainings)
                                if(Array.isArray(product_model_trainings)){
                                    for(let product of product_model_trainings){
                                        let validateProductGroup = await this.product_group_service.GetProduct_groupById(product.product_group);
                                        if(validateProductGroup != null || validateProductGroup != undefined){
                                            let validateProductModel = await this.product_model_service.GetProduct_modelById(product.product_model);
                                            if(validateProductModel != null || validateProductModel != undefined){
                                                let data = {
                                                    id: trainingData.id,
                                                    product_group_id: product.product_group,
                                                    product_model_id: product.product_model,
                                                    training_id: response.id,
                                                    createdAt: new Date(),
                                                    updatedAt: new Date(),
                                                }
                                                let createModel = await this.product_model_training_service.CreateProduct_model_training(data);
                                                if(createModel){
                                                    success.push(`${validateProductGroup.name} product model and ${validateProductModel.name} product model has been created`);
                                                }else{
                                                    errors.push(`${validateProductGroup.name} product model and ${validateProductModel.name} product model has not been created`);
                                                }
                                            }
                                        }
                                    }
                                }

                                if(errors.length > 0 && success.length == 0){
                                    let deleteTraining = await this.training_service.DeleteTraining(response.id);
                                    if(deleteTraining){
                                        res.status(400).json({errors:errors,message:"Some product group or product model didnt exist please select properly"});
                                    }
                                }else if(success.length > 0 && errors.length == 0){
                                    res.status(200).json({message:`${trainingValues.subject} created successfully` });
                                }else{
                                    res.status(400).json({errors:errors,message:"Some product group or product model didnt exist please select properly"});
                                }
                            }
                        }else{
                            res.status(400).json({error:"Please Select either png or jpg or jpeg file"});    
                        }
                    }   
                }else{
                    res.status(400).json({error:"Cannot createTraining please try again"})
                }
            } catch (error:any) {
                console.log(error)
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
    public UpdateTraining =async(req:Request,res:Response)=>{
        let id = req.params.id;
        let trainingData = req.body
        let photo = req.file;
        let destination = "src/upload/training"
        if(id == null || id == undefined){
            res.status(400).json({error:"invalid id"})
        }else{
            try {
                let training = await this.CreateTrainingData(trainingData);

                let isExist = await this.training_service.GetTrainingById(id);
                if(isExist == null || isExist == undefined){
                    res.status(400).json({error: "please select training properly"})
                }else{
                    if(photo == null || photo == undefined){
                        let data  :[affectedcount :number]= await this.training_service.UpdateTraining(id,training);       
                        if(data){
                            res.status(200).json({message:"Updated Successfully"});
                        }else{
                            res.status(400).json({error:"Cannot update please try again"});
                        } 
                    }else{
                        if(isExist.photo ==  null || isExist.photo == undefined){
                            if(photo.originalname?.split(".")[1] == "jpeg"||photo.originalname?.split(".")[1] == "png"||photo.originalname?.split(".")[1] == "jpg"){
                                let streamData = Readable.from(photo.buffer as Buffer);
                                let filename = photo.originalname?.replaceAll(" ","_");
                                let filePath = `${destination}/${filename?.split(".")[0]}_${this.getTimeStamp()}.${filename?.split(".")[1]}`;
                                let writer = fs.createWriteStream(filePath);
                                streamData.pipe(writer);
                                training["photo"] = `${process.env.server}/${filePath}`
                                let data :{error?:string,status:400}|[affectedCount?:number]|undefined = await this.training_service.UpdateTraining(id,training);       
                                {
                                    if(data ){
                                        res.status(200).json({message:"Updated Successfully"});
                                    }else{
                                        res.status(400).json({error:"Cannot update please try again"});
                                    }
                                }
                            }else{
                                res.status(400).json({error_message:"Plese select either png or jpeg or jpg file format"})
                            }
                        }else{
                            let existingImagePathParts = isExist.photo.split("/");
                            let filenameData = existingImagePathParts[existingImagePathParts.length - 1];
                            fs.rmSync(`${destination}/${filenameData}`);
                            let streamData = Readable.from((req.file as Express.Multer.File).buffer);
                            let filename = req.file?.originalname?.replaceAll(" ","_");
                            let filePath = `${destination}/${filename?.split(".")[0]}_${this.getTimeStamp()}.${filename?.split(".")[1]}`;
                            let writer = fs.createWriteStream(filePath);
                            streamData.pipe(writer);
                            training["photo"] = `${process.env.server}/${filePath}`
                            let data :{error?:string,status:400}|[affectedCount?:number]|undefined = await this.training_service.UpdateTraining(id,training); 
                                if(data){
                                    res.status(200).json({message:"Updated Successfully"});
                                }else{
                                    res.status(400).json({error:"Cannot update please try again"});
                                }
                        }
                    }
                }
            } catch ( error: any ) {
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

    public GetTrainingById =async(req:Request,res:Response)=>{
        let id = req.params.id;
        if(id == null || id == undefined){
            res.status(404).json({error:"please provide id"})
        }else{
            try {
                let trainingResponse= await this.training_service.GetTrainingById(id);
                if(trainingResponse == null || trainingResponse == undefined){
                    res.status(400).json({error:"Something went wrong please try again"});
                }
                else{
                    res.status(200).json({data: trainingResponse});
                }
            } catch (error : any) {
                res.status(400).json({error:error.message});
            }
        }
    
    }

    public GetTrainingByStatus =async(req:Request,res:Response)=>{
        let status = req.query.status;
        if(status == null || status == undefined){
            res.status(404).json({error:"Please provide status"})
        }else{
            try {
                let trainingResponse = await this.training_service.GetTrainingByStatus(status as status)
                if(trainingResponse == null || trainingResponse == undefined){
                    res.status(400).json({error:"data not found"})
                }else{
                    res.status(200).json({data:trainingResponse})
                }
            } catch (error:any) {
                res.status(400).json({error:error.message});
            }
        }
    }

    public GetAllTrainings =async(req:Request,res:Response)=>{
        let page = Number(req.query.page)
        let limit = Number(req.query.limit)
        let keyword  = req.query.keyword as string
        let filterBy = req.query.filterBy as string
        keyword = keyword == null || keyword == undefined ? "": keyword
        try {
            let trainingResponse  = await this.training_service.GetAllTrainings(page,limit,keyword,filterBy as status);
            if(trainingResponse == null || trainingResponse == undefined){
                res.status(400).json({error:"Something went wrong please try again"});
            }else{
                res.status(200).json({data : trainingResponse});
            }
        } catch (error:any) {
            res.status(400).json({error:error.message});
        }
    }

    public DeleteTraining =async(req:Request,res:Response)=>{
        let id : string = req.params?.id;
        try {
            let trainingResponse = await this.training_service.DeleteTraining(id);
            console.log(trainingResponse)
            if(trainingResponse == null || trainingResponse == undefined){
                res.status(400).json({error:"Something went wrong please try again"});
            }else if (trainingResponse.error || trainingResponse.status == 400){
                res.status(trainingResponse.status as number).json({error:trainingResponse.error});
            }
            else{
                res.status(200).json({message:"deleted successfully"})
            }
        } catch (error : any) {
            console.log(error)
            res.status(400).json({error:error.message})
        }
    }

    public BulkDeleteTrainings = async(req:Request,res:Response) => {
        let {ids} = req.body
        if(ids == null || ids == undefined){
            res.status(400).json({error:"Please provide the id to delete"});
        }else{
            let success :Array<string> = []
            let errors :Array<string> = []
            if(ids.length > 0){
                try {
                    for await(let id of ids){
                        let training = await this.training_service.GetTrainingById(id)
                        if(training != null || training != undefined){
                            let response = await this.training_service.DeleteTraining(id);
                            if(response){
                                success.push(`${training.subject} Deleted Successfully`)
                            }else{
                                errors.push(`${training.subject} Cannot deleted please try again`)
                            }
                        }
                    }
                    if(errors.length > 0 && success.length > 0){
                        res.status(400).json({success:success , errors:errors , message:"Some trainings cannot be deleted !!!!"})
                    }else if(success.length > 0 && errors.length == 0){
                        res.status(200).json({success:success , errors:errors , message:"All Trainings Deleted Successfully !!!!"})
                    }else{
                        res.status(400).json({success:success , errors:errors , message:"Couldn't Delete any of the trainings !!!!"})
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

    private CreateTrainingData = async (trainingData:trainings) => {
        let training = {
            subject : trainingData.subject ,
            details : trainingData.details,
            startDate : trainingData.startDate,
            endDate   : trainingData.endDate,
            participant_fees:trainingData.participant_fees,
            currency :trainingData.currency,
            free_cancellation : trainingData.free_cancellation,
            late_cancellation_rate :trainingData.late_cancellation_rate,
            language :trainingData.language,
            type : trainingData.type,
            limit :trainingData.limit,
            certification_expration_time :trainingData.certification_expration_time,
            training_leader :trainingData.training_leader,
            exam_pass_rate :trainingData.exam_pass_rate,
            assesment_required :trainingData.assesment_required,
            published :trainingData.published,
            status :trainingData.status,
            photo :trainingData.photo,
            country :trainingData.country,
            state :trainingData.state,
            city :trainingData.city,

        }
        return training;
    }
    
    private getTimeStamp = () =>{
        return Math.floor(Date.now() / 1000)
    }

}
export default trainingsController