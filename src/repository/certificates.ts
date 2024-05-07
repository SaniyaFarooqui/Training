import { certificates, PrismaClient } from "@prisma/client";

class certificateRepository{
    prisma:PrismaClient
     
    constructor(){
        this.prisma = new PrismaClient()
    }

    public CreateCertificate = async(certificate_templateData:certificates):Promise<certificates>=>{
        return await this.prisma.certificates.create({data:certificate_templateData})
    }

    public UpdateCertificate = async(id:string,certificate_templateData:certificates):Promise<certificates>=>{
        return await this.prisma.certificates.update({where:{id:id},data:certificate_templateData})
    }

    public GetAllCertificates = async(page:number,limit:number):Promise<{count:number,rows:Array<certificates>}>=>{
        let certificate = await this.prisma.certificates.findMany({
            skip:page,
            take:limit
        })
        let count = await this.prisma.certificates.count()
        return {count:count,rows:certificate}
    }

    public GetCertificateById = async(id:string):Promise<certificates|null>=>{
        return await this.prisma.certificates.findUnique({
            where:{
                id:id
            }
        })
    }

    public DeleteCertificate =async(id:string):Promise<certificates>=>{
        return await this.prisma.certificates.delete({
            where:{
                id:id
            }
        })
    }
}
export default certificateRepository