import { JSEncrypt } from 'jsencrypt'
const encryptor = new JSEncrypt()

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = `
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAK9L+4cRvpAdcXHSbaZrF+rKSYJhjnFJ
5giOQRCKDst5iRkFIaJkKewh+O8906xanjfQ8ONzXbA8bfm7kF1V38ECAwEAAQ==
`

const privateKey = `
MIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEAr0v7hxG+kB1xcdJt
pmsX6spJgmGOcUnmCI5BEIoOy3mJGQUhomQp7CH47z3TrFqeN9Dw43NdsDxt+buQ
XVXfwQIDAQABAkAFASdSKNiG5sBJXpeQy7foFRRaK4zUgSaXEfCbl0Vq26ZLvmQJ
agMScAM1ifY0Gej10V5laNSoM0r2ZiDkcP5BAiEA2ZAPJrupShnRSdzTSLcn9NBY
ODhJJRZidJYP7bP3RhkCIQDORFFFxXmKyqQyEza4phjuILAbNo8NXCZv7BKf++QL
6QIhALA6ruszC5gIfa0VANhf9C+sLCmt/iHalfnWLCThqCTRAiAaUwW8TdORLwN9
kI4vSqNr4KgZEQF4xwXwysQlvtP/4QIgYVQLaU18s/gTtgjnX5MxWpVPoXBxliyA
rbO3d51lkgU=
`

/**
 * 文本加密工具类
 *  encrypt: 加密
 *  decrypt: 解密
 */
export const jscrypt = {
  encrypt: (txt: string) => {
    encryptor.setPublicKey(publicKey) // 设置公钥
    return encryptor.encrypt(txt) // 加密文本
  },
  decrypt: (txt: string) => {
    encryptor.setPrivateKey(privateKey) // 设置私钥
    return encryptor.decrypt(txt) // 解密文本
  }
}
