import ISchedule_training from "../interface/ISchedule_training";
import schedule_trainingsRepository from "../../repository/schedule_trainings";
import { $Enums, schedule_trainings } from "@prisma/client";


class schedule_trainingServiceImplementation implements ISchedule_training{

    repository:schedule_trainingsRepository

    constructor(){
        this.repository = new schedule_trainingsRepository
    }

    public CreateSchedule_training = async(schedule_trainingData: schedule_trainings|any):Promise<schedule_trainings|any>=>{
        if(schedule_trainingData == null || schedule_trainingData == undefined){
            return{error:"data is required",status:400}
        }else{
            let response = await this.repository.CreateSchedule_training(schedule_trainingData)
            return response
        }
    }
    public UpdateSchedule_training = async(id:string,schedule_trainingData:schedule_trainings|any) :Promise<schedule_trainings|any> => {
        if(id == null || id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository?.UpdateSchedule_training(id,schedule_trainingData);
            return response
        }
    }

    public GetAllSchedule_trainings = async(page:number,limit:number,keyword:string,filterBy:string) :Promise<{count:number,rows:Array<schedule_trainings>}|any> => {
        if(page == null || page == undefined || limit == null || limit == undefined || page == 0 || limit == 0){
            page = 1;
            limit = 10;
        }
        let offset = (page - 1) * limit;
        let response = await this.repository?.GetAllSchedule_trainings(offset,limit,keyword,filterBy);
        return response;
    }

    public GetSchedule_trainingById = async(id:string) :Promise< schedule_trainings|any > => {
        if(id !== null ||id !== undefined || id !== ":id"){
            let response = await this.repository?.GetSchedule_trainingById(id);
            return response
        }else{
            let data = {error:"id is required",status:400}
            return data
            
        }
    }

    public DeleteSchedule_training = async(id:string) :Promise<schedule_trainings|any> => {
        if(id == null || id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository?.DeleteSchedule_training(id);
            return response;
        }
    }
}
export default schedule_trainingServiceImplementation