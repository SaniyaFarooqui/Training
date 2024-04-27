import { permissionType } from "./permissiontype"

export type roleType = {
    id?:string,
    name?:string | undefined,
    permissionId?:string | undefined,
    createdAt?:Date,
    updatedAt?:Date,
    permissions?:permissionType
}