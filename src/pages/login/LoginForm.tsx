import { Button, Checkbox, Form, Typography, Divider, Tooltip, Toast } from '@douyinfe/semi-ui'
import { useSetAtom } from 'jotai'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi } from '~/api'
import WechatIcon from '~/assets/icons/wechat.svg?react'
import { authJotai } from '~/store'
import { jscrypt } from '~/utils/jsencrypt'
import { _localStorage } from '~/utils/storage.util'

const PHONE_KEY = 'login-phone'
const PWD_KEY = 'login-pwd'
const REM_KEY = 'login-rem'
const EXPIRE_MS = 30 * 24 * 60 * 60 * 1000

export default function LoginForm() {
  const navigate = useNavigate()
  const formRef = useRef<any>()
  const [btnLoading, setBtnLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const setToken = useSetAtom(authJotai.tokenAtom)
  const setInfo = useSetAtom(authJotai.infoAtom)
  const setPermissions = useSetAtom(authJotai.permissionsAtom)

  /**
   * 根据账号密码登录
   *  校验失败: 返回错误信息
   *  校验成功:
   *    1. 获取token并存储
   *    2. 根据token获取用户信息并存储
   *    3. 弹出成功提示
   *    4. 跳转到首页
   */
  async function handleLogin() {
    const val = await formRef.current.validate()
    if (!val) return
    try {
      setBtnLoading(true)
      if (rememberMe) {
        _localStorage.setItem(PHONE_KEY, val.phone, EXPIRE_MS)
        _localStorage.setItem(PWD_KEY, jscrypt.encrypt(val.password), EXPIRE_MS)
        _localStorage.setItem(REM_KEY, rememberMe, EXPIRE_MS)
      } else {
        _localStorage.removeItem(PHONE_KEY)
        _localStorage.removeItem(PWD_KEY)
        _localStorage.removeItem(REM_KEY)
      }

      const token: any = await authApi.login(val)
      if (token) {
        setToken(token)
        const info: any = await authApi.getInfo()
        setInfo(info)
        const perms: any = await authApi.getPerms()
        setPermissions(perms)
        await Toast.success('登录成功')
        navigate('/', { replace: true })
      }
    } finally {
      setBtnLoading(false)
    }
  }

  useEffect(() => {
    const loginPhone = _localStorage.getItem(PHONE_KEY)
    const loginPwd = _localStorage.getItem(PWD_KEY)
    const loginRem = _localStorage.getItem(REM_KEY)
    formRef.current.setValues({
      phone: loginPhone ?? undefined,
      password: loginPwd ? jscrypt.decrypt(String(loginPwd)) : undefined
    })
    setRememberMe((loginRem as boolean) ?? false)
  }, [])

  return (
    <Form
      autoScrollToError
      style={{ width: '100%', textAlign: 'center', padding: '0 50px' }}
      getFormApi={formApi => (formRef.current = formApi)}
    >
      <Typography.Title heading={3}>欢迎使用</Typography.Title>
      <Form.Input
        labelPosition="inset"
        label="账 号"
        field="phone"
        placeholder="请输入手机号"
        rules={[{ required: true, message: '请输入手机号' }]}
      />
      <Form.Input
        labelPosition="inset"
        label="密 码"
        field="password"
        type="password"
        placeholder="请输入密码"
        rules={[{ required: true, message: '请输入密码' }]}
      />
      <Checkbox
        type="default"
        style={{ marginTop: '15px' }}
        checked={rememberMe}
        onChange={e => setRememberMe(e.target.checked ?? false)}
      >
        <Tooltip content={'浏览器将保存账号密码30天'} position="rightBottom">
          记住我
        </Tooltip>
      </Checkbox>

      <Button
        theme="solid"
        block
        style={{ marginTop: '10px', marginBottom: '15px' }}
        onClick={handleLogin}
        loading={btnLoading}
      >
        登录
      </Button>
      <Divider margin="10px">其他登录方式</Divider>
      <Button block icon={<WechatIcon />}>
        通过微信登录
      </Button>
    </Form>
  )
}
