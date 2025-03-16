import { IconPlusCircle, IconRefresh } from '@douyinfe/semi-icons'
import { Button, Row, Space, Typography } from '@douyinfe/semi-ui'

export default function DataTableCard({
  children,
  handleAdd,
  handleRefresh,
  title
}: {
  children: React.ReactElement
  title: string
  handleAdd: () => void
  handleRefresh: () => void
}) {
  return (
    <div
      style={{
        backgroundColor: '#fff',
        padding: '15px 20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        marginTop: '15px'
      }}
    >
      <Row
        type="flex"
        justify="space-between"
        style={{
          alignItems: 'center',
          marginBottom: '10px'
        }}
      >
        <Typography.Title heading={6}>{title}</Typography.Title>
        <Space>
          <Button onClick={handleAdd} theme="solid" icon={<IconPlusCircle />}>
            新增
          </Button>
          <Button onClick={handleRefresh} icon={<IconRefresh />}>
            刷新
          </Button>
        </Space>
      </Row>
      {children}
    </div>
  )
}
