import { Button, Checkbox, Form, Typography } from '@douyinfe/semi-ui'

export default function LoginForm() {
  return (
    <Form autoScrollToError style={{ width: '100%', textAlign: 'center', padding: '0 50px' }}>
      <Typography.Title heading={2}>欢迎回来</Typography.Title>
      <Typography.Text type="secondary">登录账户</Typography.Text>
      <Form.Input label="账 号" field="username" placeholder="请输入账号" />
      <Form.Input label="密 码" field="password" type="password" placeholder="请输入密码" />
      <Checkbox type="default">记住我</Checkbox>
      <Button theme="solid" style={{ width: '100%', marginTop: '10px' }}>
        登录
      </Button>
    </Form>
  )
}
