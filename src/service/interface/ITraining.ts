import { $Enums, status, trainings } from "@prisma/client";
 
interface ITraningService{

    CreateTraining(trainingData: trainings):Promise<trainings>

    UpdateTraining(id:string,trainingData:trainings):Promise<trainings>

    GetAllTrainings(page:number,limit:number,keyword:string,filterBy:status|$Enums.status):Promise<{count:number,rows:Array<trainings>}>

    GetTrainingById(id:string):Promise<trainings>

    GetTrainingByStatus(status:$Enums.status):Promise<trainings>
    
    DeleteTraining(id:string):Promise<trainings>
}

export default ITraningService