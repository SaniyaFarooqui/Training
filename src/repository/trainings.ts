import { PrismaClient } from "@prisma/client"
import { trainings } from "../model/trainings"


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

    public GetAllTrainings = async(page:number,limit:number,keyword:string,filterBy:string) :Promise<{count:number,rows:Array<trainings>}> => {
        let Training = await this.prisma.trainings.findMany({
            skip:page,
            take:limit
        })
        let count = await this.prisma.trainings.count()
        return {count:count,rows:Training}
    }

    public GetTrainingById = async(id:string) :Promise< trainings | null > => {
        return this.prisma.trainings.findUnique({
            where:{
                id:id
            }
        })
    }

    public DeleteTraining = async(id:string) :Promise<trainings> => {
        return this.prisma.trainings.delete({where:{id:id}})
    }

}
export default TrainingRepository