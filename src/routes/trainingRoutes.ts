import { Router } from "express";
import trainingsController from "../controller/trainingsController";
import multer = require("multer");

let upload = multer({
    storage:multer.memoryStorage()
})

let TrainingsController = new trainingsController();
let trainingRouter :Router = Router();

trainingRouter.post("/CreateTraining",upload.single("photo"),TrainingsController.CreateTraining);
trainingRouter.put("/UpdateTraining/:id",upload.single("photo"),TrainingsController.UpdateTraining)
trainingRouter.get("/GetTrainingById/:id",TrainingsController.GetTrainingById)
trainingRouter.get("/GetAllTrainings",TrainingsController.GetAllTrainings)
trainingRouter.get("/GetTrainingByStatus",TrainingsController.GetTrainingByStatus)
trainingRouter.delete("/DeleteTraining/:id",TrainingsController.DeleteTraining)
trainingRouter.delete("/BulkDeleteTrainings",TrainingsController.BulkDeleteTrainings)

export default trainingRouter;