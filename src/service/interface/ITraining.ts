import { $Enums, Prisma, status } from "@prisma/client";
import { trainings } from "../../model/trainings";
 
interface ITraningService{

    CreateTraining(trainingData: trainings): Promise<trainings|undefined|{error:"data is required",status:400}>

    UpdateTraining(id:string,trainingData:trainings):Promise<trainings>

    GetAllTrainings(page:number,limit:number,keyword:string,filterBy:status|$Enums.status): Promise< Prisma.trainingsGetPayload<{select: {product_group_trainings: {select: {id: true;product_group_id: true;product_group: { select: { id: true; name: true}}}},product_model_trainings: {select: { id: true;product_model_id: true,product_group_id: true,product_model: {select: {id: true,name: true}}}}}}>[] |undefined>

    GetTrainingById(id:string):Promise<trainings>

    GetTrainingByStatus(status:$Enums.status):Promise<trainings>
    
    DeleteTraining(id:string):Promise<trainings>
}

export default ITraningService