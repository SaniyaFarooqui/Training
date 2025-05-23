import ITraningService from "../interface/ITraining";
import TrainingRepository from "../../repository/trainings";
import { $Enums, Prisma, status,} from "@prisma/client";
import { trainings } from "../../model/trainings";


class trainingServiceImplementation implements ITraningService{
    
    repository:TrainingRepository | undefined;
    
    constructor(){
        this.repository = new TrainingRepository()
    }

    public CreateTraining = async(trainingData: trainings): Promise<trainings|undefined|{error:"data is required",status:400}> =>{
        if (trainingData == null || trainingData == undefined){
            return{error:"data is required",status:400}
        }else{
            let response = await this.repository?.CreateTraining(trainingData)
            return response
        }
    }

    public UpdateTraining = async(id:string,trainingData:trainings) :Promise<trainings|any> => {
        if(id == null || id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository?.UpdateTraining(id,trainingData);
            return response
        }
    }

    public GetAllTrainings = async(page:number,limit:number,keyword:string,filterBy:status | $Enums.status) : Promise< Prisma.trainingsGetPayload<{select: {product_group_trainings: {select: {id: true;product_group_id: true;product_group: { select: { id: true; name: true}}}},product_model_trainings: {select: { id: true;product_model_id: true,product_group_id: true,product_model: {select: {id: true,name: true}}}}}}>[]|undefined > => {
        if(page == null || page == undefined || limit == null || limit == undefined || page == 0 || limit == 0){
            page = 1;
            limit = 10;
        }
        let offset = (page - 1) * limit;
        let response = await this.repository?.GetAllTrainings(offset,limit,keyword,filterBy);
        return response;
    }

    public GetTrainingById = async(id:string) :Promise< trainings|any > => {
        if(id !== null ||id !== undefined || id !== ":id"){
            let response = await this.repository?.GetTrainingById(id);
            return response
        }else{
            let data = {error:"id is required",status:400}
            return data
            
        }
    }

    public GetTrainingByStatus  = async(status:$Enums.status|Prisma.EnumstatusFilter<"trainings">) :Promise< trainings|any > => {
        if(status !== null ||status !== undefined){
            let response = await this.repository?.GetTrainingByStatus(status);
            return response
        }else{
            let data = {error:"status is required",status:400}
            return data
            
        }
    }

    public DeleteTraining = async(id:string) :Promise<trainings|any> => {
        if(id == null || id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository?.DeleteTraining(id);
            return response;
        }
    }
}
export default trainingServiceImplementation