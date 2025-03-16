declare namespace UserType {
  type Info = {
    id?: number
    tenantID?: number
    phone?: string
    password?: string
    nickname?: string
    isPlatformAdmin?: number
    isMaster?: number
    dataScope?: number
    email?: string
    avatar?: string
    status?: number
    loginIP?: string
    loginDate?: Date
    remark?: string
    createdAt?: Date
    updatedAt?: Date
  }
  type Search = {
    phone?: string
    nickname?: string
    status?: number
  }
}
