import { Nav, Button, Avatar, Layout } from '@douyinfe/semi-ui'
import { IconBell, IconHelpCircle } from '@douyinfe/semi-icons'
import styled from 'styled-components'
import { useRouteMeta } from '~/hooks'
import { Typography } from '@douyinfe/semi-ui'

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

const AppTitle = () => {
  const { title } = useRouteMeta()
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <StyleBar />
      <Typography.Title heading={6}>{title}</Typography.Title>
    </div>
  )
}

export default function AppHeader() {
  return (
    <StyledHeader>
      <Nav
        mode="horizontal"
        header={<AppTitle />}
        footer={
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
            <Avatar color="orange" size="small">
              YJ
            </Avatar>
          </>
        }
      ></Nav>
    </StyledHeader>
  )
}
