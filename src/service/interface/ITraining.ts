import { $Enums, Prisma, status } from "@prisma/client";
import { trainings } from "../../model/trainings";
 
interface ITraningService{

    CreateTraining(trainingData: trainings): Promise<trainings|undefined|{error:"data is required",status:400}>

    UpdateTraining(id:string,trainingData:trainings):Promise<trainings |{error:string, status:number}|undefined>

    UpdatetrainingStatus(id:string,status:status):Promise<trainings |{error:string, status:number}|undefined>

    GetAllTrainings(page:number,limit:number,keyword:string,filterBy:status|$Enums.status): Promise< Prisma.trainingsGetPayload<{select: {product_group_trainings: {select: {id: true;product_group_id: true;product_group: { select: { id: true; name: true}}}},product_model_trainings: {select: { id: true;product_model_id: true,product_group_id: true,product_model: {select: {id: true,name: true}}}}}}>[] |undefined>

    GetAllTrainingsForCrons(): Promise<Prisma.trainingsGetPayload<{select:{id:true,subject:true,startDate:true,endDate:true}}>[] | undefined>

    GetTrainingById(id:string):Promise<trainings>

    GetTrainingCountById(id:string) :Promise< trainings | null |{error:string,status:number}>

    GetTrainingByStatus(status:$Enums.status):Promise<trainings>
    
    DeleteTraining(id:string):Promise<trainings>
}

export default ITraningService