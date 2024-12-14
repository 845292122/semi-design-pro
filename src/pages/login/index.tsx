import { Button, Checkbox, Form, Typography } from '@douyinfe/semi-ui'
import styled from 'styled-components'

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const LoginBox = styled.div`
  height: 400px;
  width: 500px;
  box-shadow: 5px 5px 10px #ccc;
  display: flex;
  justify-content: center;
`

export default function Login() {
  return (
    <LoginWrapper>
      <LoginBox>
        <Form autoScrollToError style={{ width: '350px', textAlign: 'center' }}>
          <Typography.Title heading={2} style={{ marginTop: '60px' }}>
            欢迎回来
          </Typography.Title>
          <Typography.Text type="secondary">登录账户</Typography.Text>
          <Form.Input label="账 号" field="username" placeholder="请输入账号" />
          <Form.Input label="密 码" field="password" type="password" placeholder="请输入密码" />
          <Checkbox type="default">记住我</Checkbox>
          <Button theme="solid" style={{ width: '100%', marginTop: '10px' }}>
            登录
          </Button>
        </Form>
      </LoginBox>
    </LoginWrapper>
  )
}
