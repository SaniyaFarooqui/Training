import { PrismaClient } from "@prisma/client";
import { certificate_templates } from "@prisma/client";

class certificate_templatesRepository{
    prisma:PrismaClient
     
    constructor(){
        this.prisma = new PrismaClient()
    }

    public CreateCertificate_template = async(certificate_templateData:certificate_templates):Promise<certificate_templates>=>{
        return await this.prisma.certificate_templates.create({data:certificate_templateData})
    }

    public UpdateCertificate_template = async(id:string,certificate_templateData:certificate_templates):Promise<certificate_templates>=>{
        return await this.prisma.certificate_templates.update({where:{id:id},data:certificate_templateData})
    }

    public GetAllCertificate_templates = async(page:number,limit:number):Promise<{count:number,rows:Array<certificate_templates>}>=>{
        let certificate_templates = await this.prisma.certificate_templates.findMany({
            skip:page,
            take:limit
        })
        let count = await this.prisma.certificate_templates.count()
        return {count:count,rows:certificate_templates}
    }

    public GetCertificate_templateById = async(id:string):Promise<certificate_templates|null>=>{
        return await this.prisma.certificate_templates.findUnique({
            where:{
                id:id
            }
        })
    }

    public GetCertificate_templateByName = async(name:string):Promise<certificate_templates|null>=>{
        return await this.prisma.certificate_templates.findFirst({
            where:{
                name:name
            }
        })
    }

    public DeleteCertificate_template =async(id:string):Promise<certificate_templates>=>{
        return await this.prisma.certificate_templates.delete({
            where:{
                id:id
            }
        })
    }
}
export default certificate_templatesRepository