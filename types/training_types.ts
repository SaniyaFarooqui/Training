import { Decimal } from "@prisma/client/runtime/library"
import schedule_trainings from "./schedule_training"

export default interface trainings{
  id ?: string
  subject ?: string | undefined
  details ?: string | undefined
  participant_fees ?: Decimal | undefined
  currency :string | undefined
  free_cancellation ?:Date | undefined
  late_cancellation_rate ?:string | undefined 
  language ?:string | undefined
  type ?:string | undefined
  limit ?:string | undefined
  startDate ?:Date | undefined
  endDate ?:Date | undefined
  certification_expration_time?: Date | undefined
  training_leader ?:string | undefined
  exam_pass_rate ?:string | undefined
  assesment_required ?: Boolean | undefined
  published ?:Boolean | undefined
  status ?:string | undefined
  photo ?:File| undefined
  country ?:string | undefined
  state ?:string | undefined
  city ?:string | undefined
  createdAt ?:Date | undefined
  updatedAt ?:Date | undefined
  scheduleTrainings ?:Array<schedule_trainings>
}

export type training = {
  id ?: string | undefined
  subject ?: string | undefined
  details ?: string | undefined
  participant_fees ?: Decimal | undefined
  currency :string | undefined
  free_cancellation ?:Date | undefined
  late_cancellation_rate ?:number | undefined
  language ?:string | undefined
  type ?:string | undefined
  limit ?:number | undefined
  startDate ?:Date | undefined
  endDate ?:Date | undefined
  certification_expration_time?: Date | undefined
  training_leader ?:string | undefined
  exam_pass_rate ?:number | undefined
  assesment_required ?: Boolean | undefined
  published ?:Boolean | undefined
  status ?:string | undefined
  photo ?:string | undefined
  country ?:string | undefined
  state ?:string | undefined
  city ?:string | undefined
  createdAt ?:Date | undefined
  updatedAt ?:Date | undefined
  scheduleTrainings ?:Array<schedule_trainings>
}


export  type status = [
    "upcoming",
    "ongoing",
    "closed",
    "finished",
    "cancelled",
    "completed",
    "completed_invoice",
    "archive"
]

