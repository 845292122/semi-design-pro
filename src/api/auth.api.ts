import service from '~/api/index'

const baseURL = '/auth'

export const authApi = {
  login: (data: AuthType.Login) => service.post(`${baseURL}/login`, data),
  getInfo: () => service.get(`${baseURL}/info`),
  getPerms: () => service.get(`${baseURL}/perms`)
}
