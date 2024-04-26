import { schedule_trainings } from "@prisma/client";

interface ISchedule_training{

    CreateSchedule_training(schedule_trainingData : schedule_trainings) : Promise<schedule_trainings>

    UpdateSchedule_training(id: string,schedule_trainingData:schedule_trainings) : Promise<schedule_trainings>

    GetAllSchedule_trainings(page:number,limit:number,keyword:string,filterBy:string):Promise<{count:number,rows:Array<schedule_trainings>}>

    GetSchedule_trainingById(id:string):Promise<schedule_trainings>

    DeleteSchedule_training(id:string):Promise<schedule_trainings>
}

export default ISchedule_training