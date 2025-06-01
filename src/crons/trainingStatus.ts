import cron from "node-cron";
import TrainingServiceImplementation from "../service/implementation/trainingServiceImplementation"

let trainingService = new TrainingServiceImplementation()

const TrainingStatusCronJobs = async () => {
    let training = await trainingService.GetAllTrainingsForCrons()
    if(Array.isArray(training)){
        for await(let data of  training){
            let startDate = new Date(data.startDate).getDate()
            let currentDate = new Date().getDate()
            console.log(startDate)
            console.log(currentDate)

            if(startDate == currentDate){
                let updatedData = await trainingService.UpdatetrainingStatus(data.id,"ongoing");
                console.log(updatedData)
                console.log(`Cronjob has been performed in the training`, data.subject);    
            }
            console.log(`Cronjob has been performed in the training`);
        }
    }
}

const ScheduleTrainingStatusCron = async () => {
    cron.schedule("* * * * *", async () => {
        await TrainingStatusCronJobs()
    })
}

export { TrainingStatusCronJobs, ScheduleTrainingStatusCron}