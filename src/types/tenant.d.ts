declare namespace TenantType {
  type Info = {
    id?: number
    contact?: string
    phone?: string
    company?: string
    licenseNumber?: string
    address?: string
    type?: number
    remark?: string
    isPlatformAdmin?: boolean
    trialStartDate?: Date
    trialEndDate?: Date
    startDate?: Date
    endDate?: Date
    status?: number
    createdAt?: Date
    updatedAt?: Date
  }

  type Search = {
    contact?: string
    company?: string
    status?: number
    type?: number
  }
}
