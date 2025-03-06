import { Button, Popconfirm, Space, Toast } from '@douyinfe/semi-ui'
import { userApi } from '~/api'

export default function MoreAction(props: any) {
  const { handleEdit, userId, handleRefresh } = props

  const handleRemove = async (userId: number) => {
    await userApi.remove(userId)
    await handleRefresh()
    Toast.success('删除成功')
  }

  return (
    <Space>
      <Button onClick={() => handleEdit(userId)}>编辑</Button>
      <Popconfirm
        title="确定是否要删除此数据？"
        content="此操作将不可逆"
        position="left"
        onConfirm={() => handleRemove(userId)}
        onCancel={() => {}}
      >
        <Button>删除</Button>
      </Popconfirm>
    </Space>
  )
}
