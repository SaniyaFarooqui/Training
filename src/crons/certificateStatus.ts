import cron from "node-cron";
import CertificateServiceImplementation from "../service/implementation/certificateServiceImplementation";

let Certificate_service = new CertificateServiceImplementation()

const certificateStatusCronJob = async()=>{
    let  certificate = await Certificate_service.GetAllCertificateForCron()
    if(Array.isArray(certificate)){
        for await(let  data of  certificate){
            let startDate = new Date(data.start_date).getDate()
            let currentDate = new Date().getDate()
            let endDate = new Date(data.end_date).getDate()

            if (startDate == currentDate){
                let updatedData = await Certificate_service.UpdateCertificateStatus(data.id,"VALID")
                console.log(updatedData)
            }else if(endDate == currentDate){
                let updatedData = await Certificate_service.UpdateCertificateStatus(data.id,"INVALID")
                console.log(updatedData)
            }
            console.log(`Cronjob has been performed in the certificate`);
        }
    }
}
export {certificateStatusCronJob}