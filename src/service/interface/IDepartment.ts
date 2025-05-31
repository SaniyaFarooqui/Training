import { departments, Prisma } from "@prisma/client";

interface IDepartmentService {
    CreateDepartment(departmentData: departments): Promise<Prisma.departmentsCreateInput|undefined>;

    UpdateDepartment(id: string, departmentData: departments): Promise<Prisma.departmentsCreateInput|{error:"id is required",status:400}|undefined> ;

    GetAllDepartments(page: number, limit: number, keyword: string, filterBy: string): Promise<{ count: number, rows: Array<departments> }>;

    GetDepartmentById(id: string): Promise<departments | null>;

    GetDepartmentByName(name: string): Promise<departments | null>;

    DeleteDepartment(id: string): Promise<departments>;
}

export default IDepartmentService;
