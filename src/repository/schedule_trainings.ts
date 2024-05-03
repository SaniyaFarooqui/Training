import { $Enums, PrismaClient } from "@prisma/client";
import { schedule_trainings } from "@prisma/client/edge";
import { users } from "../model/users";

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

    public GetSchedule_trainingByUserAndTrainingId = async(user_id : string,training_id:string) : Promise<schedule_trainings|null> =>{
        return this.prisma.schedule_trainings.findFirst({
            where:{
                user_id:user_id,
                trainingId:training_id
            }  
        })
    }

    public GetSchedule_trainingByTrainingId = async(training_id:string) : Promise<schedule_trainings|null> =>{
        return this.prisma.schedule_trainings.findFirst({
            where:{
                trainingId:training_id
            }  
        })
    }


    public GetSchedule_trainingBycompany_id = async(company_id:string) : Promise<schedule_trainings|null> =>{
        return this.prisma.schedule_trainings.findFirst({
            where:{
                company_id:company_id
            }  
        })
    }

    public GetAllApprovedSchedule_tranings = async(page:number,limit:number,keyword:string):Promise<{count:number,rows:Array<schedule_trainings>}> =>{
        let data = await this.prisma.schedule_trainings.findMany({
            skip:page,
            take:limit,
            where:{
                status:"approved",
            },
        })
        let count = data.length
        return {count:count,rows:data}
    }

    public GetAllRefusedSchedule_tranings = async(page:number,limit:number,keyword:string):Promise<{count:number,rows:Array<schedule_trainings>}> =>{
        let data = await this.prisma.schedule_trainings.findMany({
            skip:page,
            take:limit,
            where:{
                status:"refused",
            },
        })
        let count = data.length
        return {count:count,rows:data}
    }

    public GetAllRejectedSchedule_tranings = async(page:number,limit:number,keyword:string):Promise<{count:number,rows:Array<schedule_trainings>}> =>{
        let data = await this.prisma.schedule_trainings.findMany({
            skip:page,
            take:limit,
            where:{
                status:"rejected",
            },
        })
        let count = data.length
        return {count:count,rows:data}
    }

    public GetAllCompletedSchedule_tranings = async(page:number,limit:number,keyword:string):Promise<{count:number,rows:Array<schedule_trainings>}> =>{
        let data = await this.prisma.schedule_trainings.findMany({
            skip:page,
            take:limit,
            where:{
                status:"completed",
            },
        })
        let count = data.length
        return {count:count,rows:data}
    }

    public ApproveScheduleTrainingStatus = async(id:string):Promise<schedule_trainings> =>{
        let data = await this.prisma.schedule_trainings.update({where:{id:id},data:{status:"approved"}});
        return data
    }

    public DeleteSchedule_training = async(id:string) => {
        return this.prisma.schedule_trainings.delete({where:{id:id}})
    }
}

export default schedule_trainingsRepository