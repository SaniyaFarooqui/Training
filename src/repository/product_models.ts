import { PrismaClient } from "@prisma/client";
import { product_models } from "@prisma/client";

class product_modelsRepository{
    prisma:PrismaClient
     
    constructor(){
        this.prisma = new PrismaClient()
    }

    public CreateProduct_model = async(product_modelData:product_models):Promise<product_models>=>{
        return await this.prisma.product_models.create({data:product_modelData})
    }

    public UpdateProduct_model = async(id:string,product_modelData:product_models):Promise<product_models>=>{
        return await this.prisma.product_models.update({where:{id:id},data:product_modelData})
    }

    public GetAllProduct_models = async(page:number,limit:number):Promise<{count:number,rows:Array<product_models>}>=>{
        let product_models = await this.prisma.product_models.findMany({
            skip:page,
            take:limit
        })
        let count = await this.prisma.product_models.count()
        return {count:count,rows:product_models}
    }

    public GetProduct_modelById = async(id:string):Promise<product_models|null>=>{
        return await this.prisma.product_models.findUnique({
            where:{
                id:id
            }
        })
    }

    public DeleteProduct_model =async(id:string):Promise<product_models>=>{
        return await this.prisma.product_models.delete({
            where:{
                id:id
            }
        })
    }
}
export default product_modelsRepository