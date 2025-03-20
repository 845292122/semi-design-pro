import { Button, Popconfirm, Space } from '@douyinfe/semi-ui'

export type MoreActionProps = {
  handleEdit: (values: any) => void
  dataId: number
  handleRemove: (id: number) => void
  handleAssignPerm: (id: number) => void
}

export default function MoreAction(props: MoreActionProps) {
  const { handleEdit, dataId, handleRemove, handleAssignPerm } = props

  return (
    <Space>
      <Button onClick={() => handleEdit(dataId)}>编辑</Button>
      <Popconfirm
        title="确定是否要删除此数据？"
        content="此操作将不可逆"
        position="left"
        onConfirm={() => handleRemove(dataId)}
        onCancel={() => {}}
      >
        <Button>删除</Button>
      </Popconfirm>
      <Button onClick={() => handleAssignPerm(dataId)}>分配权限</Button>
    </Space>
  )
}
