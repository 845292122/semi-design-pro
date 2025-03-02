import { atomWithStorage } from 'jotai/utils'
import { AUTH } from '~/types/auth'

const tokenAtom = atomWithStorage<string | undefined>('token-atom', 'undefined')
const userInfoAtom = atomWithStorage<AUTH.AuthState | undefined>('info-atom', undefined)
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
