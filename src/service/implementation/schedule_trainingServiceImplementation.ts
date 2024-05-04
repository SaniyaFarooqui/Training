import ISchedule_training from "../interface/ISchedule_training";
import schedule_trainingsRepository from "../../repository/schedule_trainings";
import { $Enums, schedule_trainings, status } from "@prisma/client";


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

    public GetAllApprovedSchedule_trainings = async(page:number,limit:number,keyword:string):Promise<{count:number,row:Array<schedule_trainings>}|any>=>{
        if (page == null || page == undefined || limit == null || limit == undefined ){
            page = 1;
            limit = 10;
        }
        let offset = (page - 1) * limit;
        let response = await this.repository?.GetAllApprovedSchedule_tranings(offset,limit,keyword);
        return response;
    }

    public GetAllRefusedSchedule_tranings = async(page:number,limit:number,keyword:string):Promise<{count:number,row:Array<schedule_trainings>}|any>=>{
        if (page == null || page == undefined || limit == null || limit == undefined ){
            page = 1;
            limit = 10;
        }
        let offset = (page - 1) * limit;
        let response = await this.repository?.GetAllRefusedSchedule_tranings(offset,limit,keyword);
        return response;
    }

    public GetAllRejectedSchedule_tranings = async(page:number,limit:number,keyword:string):Promise<{count:number,row:Array<schedule_trainings>}|any>=>{
        if (page == null || page == undefined || limit == null || limit == undefined ){
            page = 1;
            limit = 10;
        }
        let offset = (page - 1) * limit;
        let response = await this.repository?.GetAllRejectedSchedule_tranings(offset,limit,keyword);
        return response;
    }

    public GetAllCompletedSchedule_tranings = async(page:number,limit:number,keyword:string):Promise<{count:number,row:Array<schedule_trainings>}|any>=>{
        if (page == null || page == undefined || limit == null || limit == undefined ){
            page = 1;
            limit = 10;
        }
        let offset = (page - 1) * limit;
        let response = await this.repository?.GetAllCompletedSchedule_tranings(offset,limit,keyword);
        return response;
    }


    public GetSchedule_trainingByUserAndTrainingId = async(user_id:string,training_id:string) :Promise< schedule_trainings|any > => {
        if(user_id !== null ||user_id !== undefined || user_id !== ":id"|| training_id !== null || training_id !== undefined || training_id!==":id"){
            let response = await this.repository?.GetSchedule_trainingByUserAndTrainingId(user_id,training_id);
            return response
        }else{
            let data = {error:"id is required",status:400}
            return data
            
        }
    }

    public GetSchedule_trainingByTrainingId = async(training_id:string) :Promise< schedule_trainings|any > => {
        if(training_id !== null || training_id !== undefined || training_id!==":id"){
            let response = await this.repository?.GetSchedule_trainingByTrainingId(training_id);
            return response
        }else{
            let data = {error:"id is required",status:400}
            return data
            
        }
    }

    public GetSchedule_trainingBycompany_id = async(id:string) :Promise< schedule_trainings|any > => {
        if(id !== null || id !== undefined || id!==":id"){
            let response = await this.repository?.GetSchedule_trainingBycompany_id(id);
            return response
        }else{


            let data = {error:"id is required",status:400}
            return data
            
        }
    }

    public ApproveScheduleTrainingStatus= async(id:string):Promise<schedule_trainings|any>=>{
        if(id !== null||id !== undefined){
            let data = await this.repository.ApproveScheduleTrainingStatus(id);
            return data

        }else{
            let response = {error:"id is required",status:400}
            return response
        }
    }

    public RejectedScheduleTrainingStatus= async(id:string):Promise<schedule_trainings|any>=>{
        if(id !== null||id !== undefined){
            let data = await this.repository.RejectedScheduleTrainingStatus(id);
            return data
            
        }else{
            let response = {error:"id is required",status:400}
            return response
        }
    }

    public CompleteScheduleTrainingStatus= async(id:string):Promise<schedule_trainings|any>=>{
        if(id !== null||id !== undefined){
            let data = await this.repository.CompleteScheduleTrainingStatus(id);
            return data
            
        }else{
            let response = {error:"id is required",status:400}
            return response
        }
    }

    public RefuseScheduleTrainingStatus= async(id:string):Promise<schedule_trainings|any>=>{
        if(id !== null||id !== undefined){
            let data = await this.repository.RefuseScheduleTrainingStatus(id);
            return data
            
        }else{
            let response = {error:"id is required",status:400}
            return response
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