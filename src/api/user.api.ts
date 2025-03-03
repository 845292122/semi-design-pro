import service from '.'

const baseURL = '/user'

export const userApi = {
  create: (data: ApiType.User.Info) => service.post(`${baseURL}/create`, data),
  modify: (data: ApiType.User.Info) => service.post(`${baseURL}/modify`, data),
  remove: (id: number) => service.post(`${baseURL}/remove/${id}`),
  page: (params: ApiType.Page.Param & ApiType.User.Search) =>
    service.get(`${baseURL}/page`, { params }),
  info: (id: number) => service.get(`${baseURL}/info/${id}`)
}
