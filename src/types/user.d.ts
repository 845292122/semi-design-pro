declare namespace UserType {
  type Info = {
    id?: number
    tenantID?: number
    username?: string
    password?: string
    contact?: string
    position?: string
    phone?: string
    isTenantAdmin?: number
    status?: number
    remark?: string
    wxId?: string
    createdAt?: Date
    updatedAt?: Date
  }
  type Search = {
    username?: string
    contact?: string
    status?: number
  }
}
