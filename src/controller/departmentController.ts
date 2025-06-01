import DepartmentServiceImplementation from "../service/implementation/departmentServiceImplementation";
import { Request, Response } from "express";

class DepartmentController {
    department_service: DepartmentServiceImplementation;

    constructor() {
        this.department_service = new DepartmentServiceImplementation();
    }

    public CreateDepartment = async (req: Request, res: Response) => {
        let DepartmentData = req.body ;
        if (DepartmentData == null || DepartmentData == undefined) {
            res.status(400).json({ error: "please provide the data" });
        } else {
            try {
               let response = await this.department_service.CreateDepartment(DepartmentData );
               if (response == null || response == undefined) {
                    res.status(400).json({ error: "could not create department, please try again" });
                }else{
                    res.status(201).json({ message: "Department created successfully", data: response });
                }
            } catch (error: any) {
                if (error.errors) {
                    let validationError = [];
                    for await (let response of error.errors) {
                        let obj: { path: string, message: string } = { path: "", message: "" };
                        obj.path = response.path;
                        obj.message = response.message;
                        validationError.push(obj);
                    }
                    res.status(400).json({ errors: validationError });
                } else {
                    res.status(400).json({ errors: error.message });
                }
            }
        }
    };
    public UpdateDepartment = async (req: Request, res: Response) => {
        let id = req.params.id;
        let DepartmentData = req.body;
        if (id == null || id == undefined || id === ":id") {
            res.status(400).json({ error: "please provide id" });
        } else {
            try {
                let response = await this.department_service.UpdateDepartment(id, DepartmentData);
                if (response == null || response == undefined) {
                    res.status(400).json({ error: "could not update department, please try again" });
                } else {
                    res.status(200).json({ message: "Department updated successfully", data: response });
                }
            } catch (error: any) {
                if (error.errors) {
                    let validationError = [];
                    for await (let response of error.errors) {
                        let obj: { path: string, message: string } = { path: "", message: "" };
                        obj.path = response.path;
                        obj.message = response.message;
                        validationError.push(obj);
                    }
                    res.status(400).json({ errors: validationError });
                } else {
                    res.status(400).json({ errors: error.message });
                }
            }
        }
    };
    public GetAllDepartments = async (req: Request, res: Response) => {
        let page = parseInt(req.query.page as string) || 1;
        let limit = parseInt(req.query.limit as string) || 10;
        let keyword = req.query.keyword as string || "";
        let filterBy = req.query.filterBy as string || "";
        keyword = keyword==null || keyword == undefined ? "" : keyword;
        try {
            let response = await this.department_service.GetAllDepartments(page, limit, keyword, filterBy);
            if (response == null || response == undefined || response.length === 0) {
                res.status(404).json({ error: "No departments found" });
            } else {
                res.status(200).json({ data: response });
            }
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };
    public GetDepartmentById = async (req: Request, res: Response) => {
        let id = req.params.id;
        if (id == null || id == undefined || id === ":id") {
            res.status(400).json({ error: "please provide id" });
        } else {
            try {
                let response = await this.department_service.GetDepartmentById(id);
                if (response == null || response == undefined) {
                    res.status(404).json({ error: "No department found with the provided id" });
                } else {
                    res.status(200).json({ data: response });
                }
            } catch (error: any) {
                res.status(400).json({ error: error.message });
            }
        }
    };
    public DeleteDepartment = async (req: Request, res: Response) => {
        let id = req.params.id;
        if (id == null || id == undefined || id === ":id") {
            res.status(400).json({ error: "please provide id" });
        } else {
            try {
                let response = await this.department_service.DeleteDepartment(id);
                if (response == null || response == undefined) {
                    res.status(404).json({ error: "No department found with the provided id" });
                } else {
                    res.status(200).json({ message: "Department deleted successfully", data: response });
                }
            } catch (error: any) {
                res.status(400).json({ error: error.message });
            }
        }
    }
    public BulkDeleteDepartments = async (req: Request, res: Response) => {
        let ids = req.body.ids as string
        if (ids == null || ids == undefined) {
            res.status(400).json({ error: "please provide ids" });
        } else {
            let success :Array<string> = []
            let errors :Array<string> = []
            if(ids.length > 0){
                try {
                    for await(let id of ids){
                        let department = await this.department_service.GetDepartmentById(id)
                        if(department != null || department != undefined){
                            let response = await this.department_service.DeleteDepartment(id);
                            if(response){
                                success.push(`${department.name} Deleted Successfully`)
                            }else{
                                errors.push(`${department.name} Cannot deleted please try again`)
                            }
                        }
                    }
                    if(errors.length > 0 && success.length > 0){
                        res.status(400).json({success:success , errors:errors , message:"Some departments cannot be deleted"})
                    }else if(success.length > 0 && errors.length == 0){
                        res.status(200).json({success:success , errors:errors , message:"All departments Deleted Successfully "})
                    }else{
                        res.status(400).json({success:success , errors:errors , message:"Couldn't Delete any of the departments "})
                    }
                } catch (error:any) {
                    console.log(error)
                    res.status(400).json({error:error})
                }
            }else{
                res.status(400).json({error:"Please provide id to delete"});
            }
        }
    }
}
export default DepartmentController;