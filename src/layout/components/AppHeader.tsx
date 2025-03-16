import { Nav, Button, Avatar, Layout, Dropdown, Typography } from '@douyinfe/semi-ui'
import {
  IconBell,
  IconChevronUpDown,
  IconExit,
  IconHelpCircle,
  IconKey,
  IconUserSetting
} from '@douyinfe/semi-icons'
import styled from 'styled-components'
import { useRouteMeta } from '~/hooks'
import { useNavigate } from 'react-router-dom'

const StyledHeader = styled(Layout.Header)`
  position: sticky;
  top: 0;
  z-index: 1000;
`

const StyleBar = styled.div`
  border-radius: 0.25rem;
  height: 20px;
  width: 4px;
  margin-right: 10px;
  background-color: #1d1db7;
`

const ProfileBar = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  padding: 0 10px;
  border-radius: 4px;
  height: 40px;
  &:hover {
    background-color: #f5f5f5;
  }
`

// * 标题栏
const AppTitle = () => {
  const { title } = useRouteMeta()
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <StyleBar />
      <Typography.Title heading={6}>{title}</Typography.Title>
    </div>
  )
}

// * 操作栏
const OperationBar = () => {
  const navigate = useNavigate()

  return (
    <>
      <Button
        theme="borderless"
        icon={<IconBell size="large" />}
        style={{
          color: 'var(--semi-color-text-2)',
          marginRight: '12px'
        }}
      />
      <Button
        theme="borderless"
        icon={<IconHelpCircle size="large" />}
        style={{
          color: 'var(--semi-color-text-2)',
          marginRight: '12px'
        }}
      />
      <Dropdown
        trigger="click"
        position="bottom"
        render={
          <Dropdown.Menu style={{ width: '160px' }}>
            <Dropdown.Item
              icon={<IconUserSetting />}
              onClick={() => {
                navigate('/profile')
              }}
            >
              账户信息
            </Dropdown.Item>
            <Dropdown.Item icon={<IconKey />}>修改密码</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item type="danger" icon={<IconExit />}>
              注销登录
            </Dropdown.Item>
          </Dropdown.Menu>
        }
      >
        <ProfileBar>
          <Avatar color="red" style={{ marginRight: '8px' }} shape="square" size="small">
            EZ
          </Avatar>
          <Typography.Text strong>失败的man</Typography.Text>
          <IconChevronUpDown style={{ marginLeft: '20px' }} />
        </ProfileBar>
      </Dropdown>
    </>
  )
}

export default function AppHeader() {
  return (
    <StyledHeader>
      <Nav mode="horizontal" header={<AppTitle />} footer={<OperationBar />} />
    </StyledHeader>
  )
}
