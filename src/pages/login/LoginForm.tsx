import { Button, Checkbox, Form, Typography, Divider, Tooltip } from '@douyinfe/semi-ui'
import WechatIcon from '~/assets/icons/wechat.svg?react'

export default function LoginForm() {
  return (
    <Form autoScrollToError style={{ width: '100%', textAlign: 'center', padding: '0 50px' }}>
      <Typography.Title heading={3}>欢迎使用</Typography.Title>
      <Form.Input labelPosition="inset" label="账 号" field="username" placeholder="请输入手机号" />
      <Form.Input
        labelPosition="inset"
        label="密 码"
        field="password"
        type="password"
        placeholder="请输入密码"
      />
      <Checkbox type="default" style={{ marginTop: '15px' }}>
        <Tooltip content={'浏览器将保存账号密码30天'} position="rightBottom">
          记住我
        </Tooltip>
      </Checkbox>

      <Button theme="solid" block style={{ marginTop: '10px', marginBottom: '15px' }}>
        登录
      </Button>
      <Divider margin="10px">其他登录方式</Divider>
      <Button block icon={<WechatIcon />}>
        通过微信登录
      </Button>
    </Form>
  )
}
