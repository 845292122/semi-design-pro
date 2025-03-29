import { atomWithStorage } from 'jotai/utils'

export type AuthJotai = {
  token: string | undefined
  permissions?: Array<string>
}

const tokenAtom = atomWithStorage<string | undefined>('token-atom', undefined)
const infoAtom = atomWithStorage<any>('info-atom', undefined)
const permissionsAtom = atomWithStorage<Array<string>>('permissions-atom', [])

export const authJotai = {
  tokenAtom,
  infoAtom,
  permissionsAtom
}
