import { product_groups } from "@prisma/client";


interface IProduct_groupService{

    CreateProduct_group(product_groupData: product_groups):Promise<product_groups>

    UpdateProduct_group(id:string,product_groupData:product_groups):Promise<product_groups>

    GetAllProduct_groups(page:number,limit:number):Promise<{count:number,rows:Array<product_groups>}>

    GetProduct_groupById(id:string):Promise<product_groups>
    
    DeleteProduct_group(id:string):Promise<product_groups>
}

export default IProduct_groupService