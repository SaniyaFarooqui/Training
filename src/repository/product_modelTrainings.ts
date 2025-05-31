import { PrismaClient } from "@prisma/client";
import { product_model_trainings } from "@prisma/client";

class product_modelTrainingsRepository{
    prisma:PrismaClient
     
    constructor(){
        this.prisma = new PrismaClient()
    }

    public CreateProduct_model_training = async(product_modelTrainingData:product_model_trainings):Promise<product_model_trainings>=>{
        return await this.prisma.product_model_trainings.create({data:product_modelTrainingData})
    }

    public UpdateProduct_model_training = async(id:string,product_modelTrainingData:product_model_trainings):Promise<product_model_trainings>=>{
        return await this.prisma.product_model_trainings.update({where:{id:id},data:product_modelTrainingData})
    }

    public GetAllProduct_model_trainings = async(page:number,limit:number):Promise<{count:number,rows:Array<product_model_trainings>}>=>{
        let product_modelTrainings = await this.prisma.product_model_trainings.findMany({
            skip:page,
            take:limit
        })
        let count = await this.prisma.product_model_trainings.count()
        return {count:count,rows:product_modelTrainings}
    }

    public GetProduct_model_trainingById = async(id:string):Promise<product_model_trainings|null>=>{
        return await this.prisma.product_model_trainings.findUnique({
            where:{
                id:id
            }
        })
    }

    public GetProduct_model_trainingByProductModelId = async(product_model_id:string):Promise<product_model_trainings|null>=>{
        return await this.prisma.product_model_trainings.findFirst({
            where:{
                product_model_id:product_model_id    
            }
        });
    }

    public DeleteProduct_model_training =async(id:string):Promise<product_model_trainings>=>{
        return await this.prisma.product_model_trainings.delete({
            where:{
                id:id
            }
        })
    }
}
export default product_modelTrainingsRepository