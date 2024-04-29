import schedule_trainingController from "../controller/schedule_trainingsController";
import { Router } from "express";


let Schedule_trainingController= new schedule_trainingController();
let schedule_trainingRouter :Router = Router();

schedule_trainingRouter.post("/CreateSchedule_training",Schedule_trainingController.CreateSchedule_training)
schedule_trainingRouter.put("/UpdateSchedule_training/:id",Schedule_trainingController.UpdateSchedule_training)
schedule_trainingRouter.get("/GetAllSchedule_trainings",Schedule_trainingController.GetAllSchedule_trainings)
schedule_trainingRouter.get("/GetSchedule_trainingById/:id",Schedule_trainingController.GetSchedule_trainingById)
schedule_trainingRouter.delete("/DeleteSchedule_training/:id",Schedule_trainingController.DeleteSchedule_training)
schedule_trainingRouter.delete("/BulkDeleteSchedule_trainings",Schedule_trainingController.BulkDeleteSchedule_trainings)

export default schedule_trainingRouter