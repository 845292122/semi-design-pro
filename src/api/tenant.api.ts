import service from '.'

const baseURL = '/tenant'

export const tenantApi = {
  create: (data: ApiType.Tenant.Info) => service.post(`${baseURL}/create`, data),
  modify: (data: ApiType.Tenant.Info) => service.post(`${baseURL}/modify`, data),
  remove: (id: number) => service.post(`${baseURL}/remove/${id}`),
  page: (params: ApiType.Page.Param & ApiType.Tenant.Search) =>
    service.get(`${baseURL}/page`, { params }),
  info: (id: number) => service.get(`${baseURL}/info/${id}`)
}
