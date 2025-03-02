declare namespace JotaiType {
  type Auth = {
    token: string | undefined
    userInfo?: UserInfo | undefined
    permissions?: Array<string>
    setToken: (token: string) => void
    setUserInfo: (info: UserInfo) => void
    setPermissions: (permissions: Array<string>) => void
  }
}
