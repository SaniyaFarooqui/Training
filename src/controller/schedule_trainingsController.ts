import Schedule_trainingServiceImplementation from "../service/implementation/schedule_trainingServiceImplementation"
import { Request,Response } from "express";

class schedule_trainingController {
    Schedule_trainingService: Schedule_trainingServiceImplementation

    constructor(){
        this.Schedule_trainingService = new Schedule_trainingServiceImplementation();
    }
    public CreateSchedule_training = async(req:Request,res:Response)=>{
        let schedule_trainingData = req.body
        if(schedule_trainingData == null || schedule_trainingData == undefined){
            res.status(400).json({error:"Data not found please fill the data"})
        }else{
            try {
                let isExist = await this.Schedule_trainingService.GetSchedule_trainingByUserAndTrainingId(schedule_trainingData.user_id,schedule_trainingData.training_id)
                if(isExist == null || isExist == undefined){
                    let schedule_trainingResponse = await this.Schedule_trainingService.CreateSchedule_training(schedule_trainingData)
                    if(schedule_trainingResponse == null || schedule_trainingResponse == undefined){
                        res.status(400).json({error:"schedule_trainings not created please try again"})
                    }else{
                        res.status(200).json({message:"schedule_trainings created successfully"})
                    }
                }else{
                    res.status(409).json({error:`You have already applied for this Training`});
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
    
    public UpdateSchedule_training =async(req:Request,res:Response)=>{
        let id = req.params.id;
        let schedule_trainingData = req.body
        if(id == null || id == undefined){
            res.status(400).json({error:"invalid id"})
           }else{
               try {
                   let isExist = await this.Schedule_trainingService.GetSchedule_trainingById(id);
                   if(isExist == null || isExist == undefined){
                       res.status(400).json({error: "please select training properly"})
                   }else{
                       let schedule_trainingResponse = await this.Schedule_trainingService.UpdateSchedule_training(id,schedule_trainingData);
                       if(schedule_trainingResponse == null || schedule_trainingResponse == undefined){
                           res.status(400).json({error : 'something went wrong please try again'})
                       }else{
                       res.status(200).json({message : " updated schedule_trainings successfully"}) 
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

    public GetSchedule_trainingById =async(req:Request,res:Response)=>{
        let id = req.params.id;
        if(id == null || id == undefined){
            res.status(404).json({error:"please provide id"})
        }else{
            try {
                let schedule_trainingResponse= await this.Schedule_trainingService.GetSchedule_trainingById(id);
                if(schedule_trainingResponse == null || schedule_trainingResponse == undefined){
                    res.status(200).json({data:schedule_trainingResponse});
                }
                else{
                    res.status(200).json({data: schedule_trainingResponse});
                }
            } catch (error : any) {
                res.status(400).json({error:error.message});
            }
        }
    
    }

    public GetSchedule_trainingByTrainingId = async(req:Request,res:Response)=>{
        let trainingId = req.params.trainingId
        if(trainingId == null || trainingId == undefined){
            res.status(404).json({error:"please provide id"})
        }else{
            try {
                let schedule_trainingResponse= await this.Schedule_trainingService.GetSchedule_trainingByTrainingId(trainingId);
                if(schedule_trainingResponse == null || schedule_trainingResponse == undefined){
                    res.status(200).json({data:schedule_trainingResponse});
                }
                else{
                    res.status(200).json({data: schedule_trainingResponse});
                }
            } catch (error : any) {
                res.status(400).json({error:error.message});
            }
        }
    }

    public GetSchedule_trainingBycompany_id = async(req:Request,res:Response)=>{
        let id = req.params.id;
        if(id == null || id == undefined){
            res.status(404).json({error:"please provide id"})
        }else{
            try {
                let schedule_trainingResponse= await this.Schedule_trainingService.GetSchedule_trainingBycompany_id(id);
                if(schedule_trainingResponse == null || schedule_trainingResponse == undefined){
                    res.status(200).json({data:schedule_trainingResponse});
                }
                else{
                    res.status(200).json({data: schedule_trainingResponse});
                }
            } catch (error : any) {
                res.status(400).json({error:error.message});
            }
        }
    }

    public GetAllSchedule_trainings =async(req:Request,res:Response)=>{
        let page = Number(req.query.page );
        let limit = Number(req.query.limit);
        let keyword  = req.query.keyword as string
        let filterBy = req.query.filterBy as string
        keyword = keyword == null || keyword == undefined ? "": keyword
        try {
            let schedule_trainingResponse :{count : number,rows:Array<schedule_trainingController>} | {error ?: string ,status?:number } = await this.Schedule_trainingService.GetAllSchedule_trainings(page,limit,keyword,filterBy);
            if(schedule_trainingResponse == null || schedule_trainingResponse == undefined){
                res.status(400).json({error:"Something went wrong please try again"});
            }else{
                res.status(200).json({data : schedule_trainingResponse});
            }
        } catch (error:any) {
            res.status(400).json({error:error.message});
        }
    }

    public GetAllApprovedSchedule_training = async(req:Request,res:Response)=>{
        let page = Number(req.query.page );
        let limit = Number(req.query.limit);
        let keyword = req.query.keyword as string
        keyword = keyword == null || keyword == undefined ? "": keyword
        try {
            let schedule_trainingData = await this.Schedule_trainingService.GetAllApprovedSchedule_trainings(page,limit,keyword)
            if(schedule_trainingData == null || schedule_trainingData == undefined){
                res.status(400).json({error:"Something went wrong please try again"});
            }else{
                res.status(200).json({data:schedule_trainingData});
            }
        } catch (error:any) {
            res.status(400).json({error:error.message});
        }

    }

    public GetAllRefusedSchedule_tranings = async(req:Request,res:Response)=>{
        let page = Number(req.query.page );
        let limit = Number(req.query.limit);
        let keyword = req.query.keyword as string
        keyword = keyword == null || keyword == undefined ? "": keyword
        try {
            let schedule_trainingData = await this.Schedule_trainingService.GetAllRefusedSchedule_tranings(page,limit,keyword)
            if(schedule_trainingData == null || schedule_trainingData == undefined){
                res.status(400).json({error:"Something went wrong please try again"});
            }else{
                res.status(200).json({data:schedule_trainingData});
            }
        } catch (error:any) {
            res.status(400).json({error:error.message});
        }

    }

    public GetAllRejectedSchedule_tranings = async(req:Request,res:Response)=>{
        let page = Number(req.query.page );
        let limit = Number(req.query.limit);
        let keyword = req.query.keyword as string
        keyword = keyword == null || keyword == undefined ? "": keyword
        try {
            let schedule_trainingData = await this.Schedule_trainingService.GetAllRejectedSchedule_tranings(page,limit,keyword)
            if(schedule_trainingData == null || schedule_trainingData == undefined){
                res.status(400).json({error:"Something went wrong please try again"});
            }else{
                res.status(200).json({data:schedule_trainingData});
            }
        } catch (error:any) {
            res.status(400).json({error:error.message});
        }

    }

    public GetAllCompletedSchedule_tranings = async(req:Request,res:Response)=>{
        let page = Number(req.query.page );
        let limit = Number(req.query.limit);
        let keyword = req.query.keyword as string
        keyword = keyword == null || keyword == undefined ? "": keyword
        try {
            let schedule_trainingData = await this.Schedule_trainingService.GetAllCompletedSchedule_tranings(page,limit,keyword)
            if(schedule_trainingData == null || schedule_trainingData == undefined){
                res.status(400).json({error:"Something went wrong please try again"});
            }else{
                res.status(200).json({data:schedule_trainingData});
            }
        } catch (error:any) {
            res.status(400).json({error:error.message});
        }

    }

    public ApproveScheduleTrainingStatus = async(req:Request,res:Response)=>{
        let id = req.params.id;
        if(id==null||id==undefined){
            res.status(400).json({error:"id is required"})
        }else{
            try {
                let response = await this.Schedule_trainingService.ApproveScheduleTrainingStatus(id)
                if(response == 0){
                    res.status(400).json({error:"couldnot update"})
                }else{
                    res.status(200).json({message:"approved updated successfully"})
                }
            } catch (error:any) {
                res.status(400).json({error:error.message})
            }
        }
        
    }

    public RejectedScheduleTrainingStatus = async(req:Request,res:Response)=>{
        let id = req.params.id;
        if(id==null||id==undefined){
            res.status(400).json({error:"id is required"})
        }else{
            try {
                let response = await this.Schedule_trainingService.RejectedScheduleTrainingStatus(id)
                if(response == 0){
                    res.status(400).json({error:"couldnot update"})
                }else{
                    res.status(200).json({message:"rejected updated successfully"})
                }
            } catch (error:any) {
                res.status(400).json({error:error.message})
            }
        }
        
    }

    public CompleteScheduleTrainingStatus = async(req:Request,res:Response)=>{
        let id = req.params.id;
        if(id==null||id==undefined){
            res.status(400).json({error:"id is required"})
        }else{
            try {
                let response = await this.Schedule_trainingService.CompleteScheduleTrainingStatus(id)
                if(response == 0){
                    res.status(400).json({error:"couldnot update"})
                }else{
                    res.status(200).json({message:"completed updated successfully"})
                }
            } catch (error:any) {
                res.status(400).json({error:error.message})
            }
        }
        
    }

    public RefuseScheduleTrainingStatus = async(req:Request,res:Response)=>{
        let id = req.params.id;
        if(id==null||id==undefined){
            res.status(400).json({error:"id is required"})
        }else{
            try {
                let response = await this.Schedule_trainingService.RefuseScheduleTrainingStatus(id)
                if(response == 0){
                    res.status(400).json({error:"couldnot update"})
                }else{
                    res.status(200).json({message:"refused updated successfully"})
                }
            } catch (error:any) {
                res.status(400).json({error:error.message})
            }
        }
        
    }

    public DeleteSchedule_training =async(req:Request,res:Response)=>{
        let id : string = req.params?.id;
        try {
            let schedule_trainingResponse = await this.Schedule_trainingService.DeleteSchedule_training(id);
            if(schedule_trainingResponse == null || schedule_trainingResponse == undefined){
                res.status(400).json({error:"Something went wrong please try again"});
            }else if (schedule_trainingResponse.error || schedule_trainingResponse.status == 400){
                res.status(schedule_trainingResponse.status as number).json({error:schedule_trainingResponse.error});
            }
            else{
                res.status(200).json({message:"deleted successfully"})
            }
        } catch (error : any) {
            console.log(error)
            res.status(400).json({error:error.message})
        }
    }

    public BulkDeleteSchedule_trainings = async(req:Request,res:Response) => {
        let {ids} = req.body
        if(ids == null || ids == undefined){
            res.status(400).json({error:"Please provide the id to delete"});
        }else{
            let success :Array<string> = []
            let errors :Array<string> = []
            if(ids.length > 0){
                try {
                    for await(let id of ids){
                        let schedule_training = await this.Schedule_trainingService.GetSchedule_trainingById(id)
                        if(schedule_training != null || schedule_training != undefined){
                            let response = await this.Schedule_trainingService.DeleteSchedule_training(id);
                            if(response){
                                success.push(`${schedule_training.subject} Deleted Successfully`)
                            }else{
                                errors.push(`${schedule_training.subject} Cannot deleted please try again`)
                            }
                        }
                    }
                    if(errors.length > 0 && success.length > 0){
                        res.status(400).json({success:success , errors:errors , message:"Some schedule_trainings cannot be deleted !!!!"})
                    }else if(success.length > 0 && errors.length == 0){
                        res.status(200).json({success:success , errors:errors , message:"All schedule_trainings Deleted Successfully !!!!"})
                    }else{
                        res.status(400).json({success:success , errors:errors , message:"Couldn't Delete any of the schedule_trainings !!!!"})
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
export default schedule_trainingController;