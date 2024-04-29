import { Decimal } from "@prisma/client/runtime/library"
import trainings from "./training_types"

export default interface schedule_training{
    id ?:String 
    trainingId?: String 
    user_id ?:String
    company_id ?:String
    status ?:String
    payment_status ?:String 
    accepted_by ?:String
    accepted_date ?:String
    approved_by ?:String
    approved_date ?:String
    rejected_by ?:String
    rejected_date ?:String
    training_fees ?:Decimal
    payment_status_updated_by ?:String
    payment_status_updated_date ?:String
    cancellation_request_by ?:String
    cancellation_request_date ?:String
    user_training_fee ?:Decimal
    exam_result ?:Decimal
    exam_result_status ?:String
    invoice_done ?:Boolean
    payment_recieved ?: Boolean
    invoice_number ?:String
    approved_reasons ?:String
    purchase_number ?:String
    training?:trainings
    joining_waiting_list_date ?:Date
    createdAt ?:Date
    updatedAt ?:Date
}
