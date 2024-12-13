import { Nav, Button, Avatar, Layout, Breadcrumb } from '@douyinfe/semi-ui'
import { IconBell, IconHelpCircle } from '@douyinfe/semi-icons'
import styled from 'styled-components'

const StyledHeader = styled(Layout.Header)`
  position: sticky;
  top: 0;
  z-index: 1000;
`
export default function AppHeader() {
  return (
    <StyledHeader>
      <Nav
        mode="horizontal"
        header={
          <>
            <Breadcrumb
              style={{
                marginBottom: '24px'
              }}
              routes={['首页', '当这个页面标题很长时需要省略', '上一页', '详情页']}
            />
          </>
        }
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
