import service from '.'

const baseURL = '/tenant'

export const tenantApi = {
  create: (data: TenantType.Info) => service.post(`${baseURL}/create`, data),
  modify: (data: TenantType.Info) => service.post(`${baseURL}/modify`, data),
  remove: (id: number) => service.post(`${baseURL}/remove/${id}`),
  page: (params: CommonType.PageParam & TenantType.Search) =>
    service.get(`${baseURL}/page`, { params }),
  info: (id: number) => service.get(`${baseURL}/info/${id}`),
  list: () => service.get(`${baseURL}/list`)
}
