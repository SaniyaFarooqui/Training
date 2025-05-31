import { Prisma, PrismaClient } from "@prisma/client";
import { product_group_trainings } from "@prisma/client";

class product_groupTrainingsRepository{
    prisma:PrismaClient
     
    constructor(){
        this.prisma = new PrismaClient()
    }

   public CreateProduct_group_training = async (product_groupTrainingData: Prisma.product_group_trainingsUncheckedCreateInput): Promise<product_group_trainings> => {
        return await this.prisma.product_group_trainings.create({data: product_groupTrainingData});
    }


    public UpdateProduct_group_training = async(id:string,product_groupTrainingData:product_group_trainings):Promise<product_group_trainings>=>{
        return await this.prisma.product_group_trainings.update({where:{id:id},data:product_groupTrainingData})
    }

    public GetAllProduct_group_trainings = async(page:number,limit:number):Promise<{count:number,rows:Array<product_group_trainings>}>=>{
        let product_groupTrainings = await this.prisma.product_group_trainings.findMany({
            skip:page,
            take:limit
        })
        let count = await this.prisma.product_group_trainings.count()
        return {count:count,rows:product_groupTrainings}
    }

    public GetProduct_group_trainingById = async(id:string):Promise<product_group_trainings|null>=>{
        return await this.prisma.product_group_trainings.findUnique({
            where:{
                id:id
            }
        })
    }

    public GetProduct_group_trainingByProductGroupId = async(product_group_id:string):Promise<product_group_trainings|null>=>{
        return await this.prisma.product_group_trainings.findFirst({
            where:{
                product_group_id:product_group_id
            }
        })
    }

    public DeleteProduct_group_training =async(id:string):Promise<product_group_trainings>=>{
        return await this.prisma.product_group_trainings.delete({
            where:{
                id:id
            }
        })
    }
}
export default product_groupTrainingsRepository