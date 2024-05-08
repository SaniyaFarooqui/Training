import { $Enums, schedule_trainings } from "@prisma/client";

interface ISchedule_training{

    CreateSchedule_training(schedule_trainingData : schedule_trainings) : Promise<schedule_trainings>

    UpdateSchedule_training(id: string,schedule_trainingData:schedule_trainings) : Promise<schedule_trainings>

    GetAllSchedule_trainings(page:number,limit:number,keyword:string,filterBy:$Enums.exam_result_status ):Promise<{count:number,rows:Array<schedule_trainings>}>

    GetSchedule_trainingById(id:string):Promise<schedule_trainings>

    GetAllApprovedSchedule_trainings(page:number,limit:number,keyword:string):Promise<{count:number,rows:Array<schedule_trainings>}>

    GetAllRefusedSchedule_tranings(page:number,limit:number,keyword:string):Promise<{count:number,rows:Array<schedule_trainings>}>

    GetAllRejectedSchedule_tranings(page:number,limit:number,keyword:string):Promise<{count:number,rows:Array<schedule_trainings>}>

    GetAllCompletedSchedule_tranings(page:number,limit:number,keyword:string):Promise<{count:number,rows:Array<schedule_trainings>}>

    GetSchedule_trainingByUserAndTrainingId(user_id:string,training_id:string):Promise<schedule_trainings>

    GetSchedule_trainingByTrainingId(training_id:string):Promise<schedule_trainings>

    GetSchedule_trainingBycompany_id(id:string):Promise<schedule_trainings>

    ApproveScheduleTrainingStatus(id:string):Promise<schedule_trainings>

    RejectedScheduleTrainingStatus(id:string):Promise<schedule_trainings>

    CompleteScheduleTrainingStatus(id:string):Promise<schedule_trainings>

    RefuseScheduleTrainingStatus(id:string):Promise<schedule_trainings>

    DeleteSchedule_training(id:string):Promise<schedule_trainings>
}

export default ISchedule_training