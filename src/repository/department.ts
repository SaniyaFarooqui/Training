import { PrismaClient } from "@prisma/client";
import { departments } from "../model/department";

class DepartmentRepository {
    prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    public CreateDepartment = async (departmentData: departments): Promise<departments> => {
        return await this.prisma.departments.create({ data: departmentData });
    }

    public UpdateDepartment = async (id: string, departmentData: departments): Promise<departments > => {
        return await this.prisma.departments.update({ where: { id: id }, data: departmentData });
    }

    public GetAllDepartments = async (page: number, limit: number, keyword: string, filterBy: string): Promise<{ count: number, rows: Array<departments> } > => {
        let departments = await this.prisma.departments.findMany({
            where: {
                OR: [
                    {
                        name: {
                            startsWith: keyword,
                            mode: 'insensitive'
                        }
                    }
                ],
            },
            skip: page,
            take: limit
        });
        let count = await this.prisma.departments.count();
        return { count: count, rows: departments };
    }

    public GetDepartmentById = async (id: string): Promise<departments |null> => {
        return await this.prisma.departments.findUnique({
            where: {
                id: id
            }
        });
    }
    public GetDepartmentByName = async (name: string): Promise<departments | null> => {
        return await this.prisma.departments.findFirst({
            where: {
                name: {
                    equals: name,
                    mode: 'insensitive'
                }
            }
        });
    }

    public DeleteDepartment = async (id: string): Promise<departments> => {
        return await this.prisma.departments.delete({ where: { id: id } });
    }
}
export default DepartmentRepository;