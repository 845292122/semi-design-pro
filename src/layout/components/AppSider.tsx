import { Layout, Nav } from '@douyinfe/semi-ui'
import { IconHome, IconHistogram, IconLive, IconSetting, IconSemiLogo } from '@douyinfe/semi-icons'

export default function AppSider() {
  return (
    <Layout.Sider>
      <Nav
        defaultSelectedKeys={['Home']}
        style={{ maxWidth: 220, height: '100%' }}
        items={[
          { itemKey: 'Home', text: '首页', icon: <IconHome size="large" /> },
          { itemKey: 'Histogram', text: '基础数据', icon: <IconHistogram size="large" /> },
          { itemKey: 'Live', text: '测试功能', icon: <IconLive size="large" /> },
          { itemKey: 'Setting', text: '设置', icon: <IconSetting size="large" /> }
        ]}
        header={{
          logo: <IconSemiLogo style={{ fontSize: 36 }} />,
          text: 'Semi Design'
        }}
        footer={{
          collapseButton: true
        }}
      />
    </Layout.Sider>
  )
}
