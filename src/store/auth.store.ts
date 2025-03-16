import { atomWithStorage } from 'jotai/utils'

export type AuthJotai = {
  token: string | undefined
  permissions?: Array<string>
  setToken: (token: string) => void
  setPermissions: (permissions: Array<string>) => void
}

const tokenAtom = atomWithStorage<string | undefined>('token-atom', 'undefined')
const userInfoAtom = atomWithStorage<AuthJotai | undefined>('info-atom', undefined)
const permissionsAtom = atomWithStorage<Array<string>>('permissions-atom', [
  'admin',
  'system',
  'system:user',
  'system:role',
  'system:tenant',
  'test',
  'system:test'
])

export const authJotai = {
  tokenAtom,
  userInfoAtom,
  permissionsAtom
}
