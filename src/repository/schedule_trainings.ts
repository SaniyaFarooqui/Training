import { PrismaClient } from "@prisma/client";
import { schedule_trainings } from "../model/schedule_trainings";
class schedule_trainingsRepository{
    prisma: PrismaClient;
    
    constructor(){
        this.prisma = new PrismaClient();
    }

    public CreateSchedule_training = async(schedule_trainingData : schedule_trainings):Promise<schedule_trainings>=>{
        return await this.prisma.schedule_trainings.create({data:schedule_trainingData})
    }
    public UpdateSchedule_training = async(id:string,schedule_trainingData:schedule_trainings):Promise<schedule_trainings>=>{
        return await this.prisma.schedule_trainings.update({where:{id:id},data:schedule_trainingData})
    }
    public GetAllSchedule_trainings = async(page:number, limit:number,keyword:string,filterBy:string):Promise<{count:number,rows:Array<schedule_trainings>}>=>{
        let schedule_training = await this.prisma.schedule_trainings.findMany({
            skip:page,
            take:limit
        })
        let count = await this.prisma.schedule_trainings.count()
        return {count:count,rows:schedule_training}
    }
    public GetSchedule_trainingById = async(id:string) => {
        return this.prisma.schedule_trainings.findUnique({
            where:{
                id:id
            }
        })
    }

    public DeleteSchedule_training = async(id:string) => {
        return this.prisma.schedule_trainings.delete({where:{id:id}})
    }
}

export default schedule_trainingsRepository