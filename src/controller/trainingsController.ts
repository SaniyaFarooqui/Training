import { Prisma } from "@prisma/client";
import trainingServiceImplementation from "../service/implementation/trainingServiceImplementation";
import { Request,response,Response } from "express";

class trainingsController{
    training_service: trainingServiceImplementation

    constructor(){
        this.training_service = new trainingServiceImplementation();
    }

    public CreateTraining = async(req:Request,res:Response)=>{
        let trainingData = req.body
        if(trainingData == null || trainingData == undefined){
            res.status(400).json({error:"Data not found please fill the data"})
        }else{
            try {
                let trainingResponse = await this.training_service.CreateTraining(trainingData)
                if(trainingResponse == null || trainingResponse == undefined){
                    res.status(400).json({error:"training not created please try again"})
                }else{
                    res.status(200).json({message:"Training created successfully"})
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
    
    public UpdateTraining =async(req:Request,res:Response)=>{
        let id = req.params.id;
        let trainingData = req.body
        if(id == null || id == undefined){
            res.status(400).json({error:"invalid id"})
           }else{
               try {
                   let isExist = await this.training_service.GetTrainingById(id);
                   if(isExist == null || isExist == undefined){
                       res.status(400).json({error: "please select training properly"})
                   }else{
                       let trainingResponse = await this.training_service.UpdateTraining(id,trainingData);
                       console.log(trainingResponse)
                       if(trainingResponse == null || trainingResponse == undefined){
                           res.status(200).json({data:trainingResponse})
                       }else{
                       res.status(200).json({message : " updated training successfully"}) 
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
                let trainingResponse = await this.training_service.GetTrainingByStatus(status as Prisma.EnumstatusFilter)
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
        let page = req.query.page as unknown as number;
        let limit = req.query.limit as unknown as number;
        let keyword  = req.query.keyword as string
        let filterBy = req.query.filterBy as string
        keyword = keyword == null || keyword == undefined ? "": keyword
        try {
            let trainingResponse :{count : number,rows:object[]} | {error ?: string ,status?:number } = await this.training_service.GetAllTrainings(page,limit,keyword,filterBy);
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



}
export default trainingsController