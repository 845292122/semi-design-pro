import styled from 'styled-components'
import loginIll from '~/assets/login/login-ill.svg'
import LoginForm from './LoginForm'
import loginBg from '~/assets/login/login-bg.png'

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-size: cover;
  background-position: center;
`

const LoginBox = styled.div`
  min-height: 450px;
  min-width: 900px;
  box-shadow: 5px 5px 10px #ccc;
  display: flex;
  justify-content: center;
`

const LoginIll = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: #f9f9f9;
`

const LoginFormWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`

export default function Login() {
  return (
    <LoginWrapper style={{ backgroundImage: `url(${loginBg})` }}>
      <LoginBox>
        <LoginIll>
          <img src={loginIll} style={{ width: '280px' }} alt="login-ill" />
        </LoginIll>
        <LoginFormWrapper>
          <LoginForm />
        </LoginFormWrapper>
      </LoginBox>
    </LoginWrapper>
  )
}
