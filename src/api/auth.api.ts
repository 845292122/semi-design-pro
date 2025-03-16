import service from '~/api/index'

const baseURL = '/auth'

export const $AuthApi = {
  login: (data: AuthType.Login) => service.post(`${baseURL}/login`, data),
  getInfo: () => service.get(`${baseURL}/info`)
}
