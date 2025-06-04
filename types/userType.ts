export type userType={
    id?: string
        name: string
        surname: string
        personal_title: string
        work_title: string
        email: string
        status: string
        mobile_phone: string
        office_phone: string
        profile_image: string
        password: string
        TwoFactorAuthentication: boolean
        TwoFactorForced: boolean
        TwoFactorAuthenticationSecret: string
        emailConfirmed: boolean
        address: string
        adminConfirmed: string
        registered: boolean
        accessFailedCount: number
        access_failed_restrict: Date | string
        is_deleted: boolean
        approved_by: string
        approved_date: Date | string
        declined_by: string
        declined_date: Date | string
        country_id: number
        role_id : string 
        company_id :string
        city_id: number
        date_of_birth: Date | string
        zip_code: string
        state_id:number
        departmentId:string|null
        type:string
        createdAt?: Date | string
        updatedAt?: Date | string
}