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
                let schedule_trainingResponse = await this.Schedule_trainingService.CreateSchedule_training(schedule_trainingData)
                if(schedule_trainingResponse == null || schedule_trainingResponse == undefined){
                    res.status(400).json({error:"schedule_trainings not created please try again"})
                }else{
                    res.status(200).json({message:"schedule_trainings created successfully"})
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
                       console.log(schedule_trainingResponse)
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
                    res.status(400).json({error:"Something went wrong please try again"});
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
        let page = req.query.page as unknown as number;
        let limit = req.query.limit as unknown as number;
        let keyword  = req.query.keyword as string
        let filterBy = req.query.filterBy as string
        keyword = keyword == null || keyword == undefined ? "": keyword
        try {
            let schedule_trainingResponse :{count : number,rows:object[]} | {error ?: string ,status?:number } = await this.Schedule_trainingService.GetAllSchedule_trainings(page,limit,keyword,filterBy);
            if(schedule_trainingResponse == null || schedule_trainingResponse == undefined){
                res.status(400).json({error:"Something went wrong please try again"});
            }else{
                res.status(200).json({data : schedule_trainingResponse});
            }
        } catch (error:any) {
            res.status(400).json({error:error.message});
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