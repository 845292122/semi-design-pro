declare namespace CommonType {
  type PageParam = {
    pageNo: number
    pageSize: number
  }

  type PageResult<T> = {
    records: T[]
    total: number
  }
}

declare module 'jsencrypt' {
  export class JSEncrypt {
    constructor()
    setPublicKey(pk: string): void
    encrypt(key: string): string
    setPrivateKey(pk: string): void
    decrypt(key: string): string
  }
}
