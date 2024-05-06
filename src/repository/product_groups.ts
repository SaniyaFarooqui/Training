import { PrismaClient } from "@prisma/client";
import { product_groups } from "@prisma/client";

class product_groupsRepository{
    prisma:PrismaClient
     
    constructor(){
        this.prisma = new PrismaClient()
    }

    public CreateProduct_group = async(product_groupData:product_groups):Promise<product_groups>=>{
        return await this.prisma.product_groups.create({data:product_groupData})
    }

    public UpdateProduct_group = async(id:string,product_groupData:product_groups):Promise<product_groups>=>{
        return await this.prisma.product_groups.update({where:{id:id},data:product_groupData})
    }

    public GetAllProduct_groups = async(page:number,limit:number):Promise<{count:number,rows:Array<product_groups>}>=>{
        let product_groups = await this.prisma.product_groups.findMany({
            skip:page,
            take:limit
        })
        let count = await this.prisma.product_groups.count()
        return {count:count,rows:product_groups}
    }

    public GetProduct_groupById = async(id:string):Promise<product_groups|null>=>{
        return await this.prisma.product_groups.findUnique({
            where:{
                id:id
            }
        })
    }

    public DeleteProduct_group =async(id:string):Promise<product_groups>=>{
        return await this.prisma.product_groups.delete({
            where:{
                id:id
            }
        })
    }
}
export default product_groupsRepository