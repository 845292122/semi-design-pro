import { Outlet } from 'react-router-dom'
import { Layout } from '@douyinfe/semi-ui'
import styled from 'styled-components'
import AppSider from './components/AppSider'
import AppHeader from './components/AppHeader'

const StyledLayout = styled(Layout)`
  height: 100%;
  display: flex;
`

const AppLayout = () => {
  const { Content } = Layout
  return (
    <StyledLayout>
      <AppSider />
      <Layout style={{ flex: 1 }}>
        <AppHeader />
        <Content
          style={{
            padding: '24px'
          }}
        >
          <div>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </StyledLayout>
  )
}

export default AppLayout
