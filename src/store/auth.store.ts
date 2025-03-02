import { atomWithStorage } from 'jotai/utils'

const tokenAtom = atomWithStorage<string | undefined>('token-atom', 'undefined')
const userInfoAtom = atomWithStorage<JotaiType.Auth | undefined>('info-atom', undefined)
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
