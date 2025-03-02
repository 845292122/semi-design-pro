import { Button, Checkbox, Form, Typography, Divider, Space, Icon } from '@douyinfe/semi-ui'
import WechatIcon from '~/assets/icons/wechat.svg?react'
import QQIcon from '~/assets/icons/qq.svg?react'
import PhoneIcon from '~/assets/icons/phone.svg?react'

export default function LoginForm() {
  return (
    <Form autoScrollToError style={{ width: '100%', textAlign: 'center', padding: '0 50px' }}>
      <Typography.Title heading={3}>欢迎使用</Typography.Title>
      <Form.Input labelPosition="inset" label="账 号" field="username" placeholder="请输入账号" />
      <Form.Input
        labelPosition="inset"
        label="密 码"
        field="password"
        type="password"
        placeholder="请输入密码"
      />
      <Checkbox type="default" style={{ marginTop: '7px' }}>
        保持登录
      </Checkbox>
      <Button theme="solid" block style={{ marginTop: '7px', marginBottom: '15px' }}>
        登录
      </Button>
      <Divider margin="10px">其他登录方式</Divider>
      <Space spacing="loose">
        <Icon svg={<WechatIcon />} />
        <Icon svg={<QQIcon />} />
        <Icon svg={<PhoneIcon />} />
      </Space>
    </Form>
  )
}
