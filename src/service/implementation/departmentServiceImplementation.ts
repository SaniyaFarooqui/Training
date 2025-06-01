import IDepartmentService from "../interface/IDepartment";
import DepartmentRepository from "../../repository/department";
import { departments, Prisma } from "@prisma/client";
import { promises } from "nodemailer/lib/xoauth2";
import { Count } from "@prisma/client/runtime/library";

class DepartmentServiceImplementation implements IDepartmentService {
    repository: DepartmentRepository | undefined;

    constructor() {
        this.repository = new DepartmentRepository();
    }

    public CreateDepartment = async (departmentData: departments): Promise<Prisma.departmentsCreateInput|undefined > => {
            let response = await this.repository?.CreateDepartment(departmentData);
            return response;
        
    }

    public UpdateDepartment = async (id: string, departmentData: departments): Promise<Prisma.departmentsCreateInput|{error:"id is required",status:400}|undefined> => {
        if (id == null || id == undefined || id === ":id") {
            return { error: "id is required", status: 400 };
        } else {
            let response = await this.repository?.UpdateDepartment(id, departmentData);
            return response;
        }
    }

    public GetAllDepartments = async (page: number, limit: number, keyword: string, filterBy: string): Promise<Prisma.departmentsGetPayload<{include:{user:true}}>[]|undefined> => {
        if (page == null || page == undefined || limit == null || limit == undefined || page == 0 || limit == 0) {
            page = 1;
            limit = 10;
        }
        let offset = (page - 1) * limit;
        let response = await this.repository?.GetAllDepartments(offset, limit, keyword, filterBy);
        return response;
    }

    public GetDepartmentById = async (id: string): Promise<departments | any> => {
        if (id == null || id == undefined || id === ":id") {
            return { error: "id is required", status: 400 };
        } else {
            let response = await this.repository?.GetDepartmentById(id);
            return response;
        }
    }

    public GetDepartmentByName = async (name: string): Promise<departments | null|any> => {
        let response = await this.repository?.GetDepartmentByName(name);
        return response;
    }

    public DeleteDepartment = async (id: string): Promise<departments | any> => {
        if (id == null || id == undefined || id === ":id") {
            return { error: "id is required", status: 400 };
        } else {
            let response = await this.repository?.DeleteDepartment(id);
            return response;
        }
    }
}

export default DepartmentServiceImplementation;