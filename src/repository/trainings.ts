import { $Enums, Prisma, PrismaClient, status } from "@prisma/client"
import {trainings} from "../model/trainings"
class TrainingRepository{
    prisma: PrismaClient

    constructor(){
        this.prisma = new PrismaClient()
    }

    public CreateTraining = async(trainingData:trainings) :Promise<trainings> => {
        return await this.prisma.trainings.create({data:trainingData})
    }

    public UpdateTraining = async(id:string,trainingData:trainings) :Promise<trainings> => {
        return await this.prisma.trainings.update({where:{id:id},data:trainingData})
    }

    public GetAllTrainings = async(page:number,limit:number,keyword:string,filterBy:status | $Enums.status) :Promise< Prisma.trainingsGetPayload<{select: {product_group_trainings: {select: {id: true;product_group_id: true;product_group: { select: { id: true; name: true}}}},product_model_trainings: {select: { id: true;product_model_id: true,product_group_id: true,product_model: {select: {id: true,name: true}}}}}}>[] > => {
        let Training = await this.prisma.trainings.findMany({
            where:{
                OR:[
                {
                    subject:{
                        contains:keyword,
                        mode:'insensitive'
                    },
                },
                {
                    details:{
                        contains:keyword,
                        mode:'insensitive'
                    }
                }
                
            ],
                status:filterBy,
            },
            skip:page,
            take:limit,
            select:{
                id:true,
                subject:true,
                details:true,
                status:true,
                assesment_required:true,
                participant_fees :true,
                currency :true,
                free_cancellation :true,
                late_cancellation_rate :true,
                language :true,
                type :true,
                limit :true,
                startDate :true,
                endDate :true,
                certification_expration_time :true,
                training_leader :true,
                exam_pass_rate :true,
                published :true,
                photo :true,
                country :true,
                state :true,
                city :true,
                createdAt :true, 
                updatedAt :true, 
                scheduleTrainings :true,
                product_group_trainings:{
                    select:{
                        id:true,
                        product_group_id:true,
                        product_group:{
                            select:{
                                id:true,
                                name:true,
                            }                           
                        }
                    }
                },
                product_model_trainings:{
                    select:{
                        id:true,
                        product_model_id:true,
                        product_group_id:true,
                            product_model:{
                                select:{
                                    id:true,
                                    name:true,
                                }
                            }
                        }
                    
                }
            },
          orderBy:{updatedAt:"desc"}
            
         })
        return Training
    }

    public GetTrainingById = async(id:string) :Promise< trainings | null > => {
        return this.prisma.trainings.findUnique({
            where:{
                id:id
            }
        })
    }

    public GetTrainingByStatus = async(status:$Enums.status | Prisma.EnumstatusFilter<"trainings">  |undefined) :Promise<{count:number,rows:Array<trainings>}> => {
        let response = await this.prisma.trainings.findMany({
            where:{
                status:status
            }
        })
        let count = response.length
        return {count:count,rows:response}
    }

    public DeleteTraining = async(id:string) :Promise<trainings> => {
        return this.prisma.trainings.delete({where:{id:id}})
    }

}
export default TrainingRepository