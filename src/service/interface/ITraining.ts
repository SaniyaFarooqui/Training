import { trainings } from "@prisma/client";
 
interface ITraningService{

    CreateTraining(trainingData: trainings):Promise<trainings>

    UpdateTraining(id:string,trainingData:trainings):Promise<trainings>

    GetAllTrainings(page:number,limit:number,keyword:string,filterBy:string):Promise<{count:number,rows:Array<trainings>}>

    GetTrainingById(id:string):Promise<trainings>
    
    DeleteTraining(id:string):Promise<trainings>
}

export default ITraningService