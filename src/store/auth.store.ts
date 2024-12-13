import { atomWithStorage } from 'jotai/utils'
import { AUTH } from '~/types/auth'

const tokenAtom = atomWithStorage<string | undefined>('token-atom', 'undefined')
const userInfoAtom = atomWithStorage<AUTH.AuthState | undefined>('info-atom', undefined)
const permissionsAtom = atomWithStorage<Array<string>>('permissions-atom', ['admin'])

export { tokenAtom, userInfoAtom, permissionsAtom }
