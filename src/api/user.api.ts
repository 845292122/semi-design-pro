import service from '.'

const baseURL = '/user'

export const userApi = {
  create: (data: UserType.Info) => service.post(`${baseURL}/create`, data),
  modify: (data: UserType.Info) => service.post(`${baseURL}/modify`, data),
  remove: (id: number) => service.post(`${baseURL}/remove/${id}`),
  page: (params: CommonType.PageParam & UserType.Search) =>
    service.get(`${baseURL}/page`, { params }),
  info: (id: number) => service.get(`${baseURL}/info/${id}`),
  perms: (id: number) => service.get(`${baseURL}/perms/${id}`),
  assignPerms: (data: PermType.Info) => service.post(`${baseURL}/assignPerms`, data)
}
