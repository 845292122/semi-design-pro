import { Modal, Toast, Tree } from '@douyinfe/semi-ui'
import { useState } from 'react'

export type PermModalProps = {
  visible: boolean
  onCancel: () => void
  treeData: Array<any>
  defaultValue: Array<any>
  assignPerms: (id: number, perms: string[]) => void
  id: number | undefined
}

export default function PermModal({
  visible,
  onCancel,
  treeData,
  defaultValue,
  assignPerms,
  id
}: PermModalProps) {
  const [selectedValues, setSelectedValues] = useState<any[]>([])

  async function onOk() {
    if (!id) {
      Toast.warning('锁定租户时出了点问题~')
      return
    }
    await assignPerms(id, selectedValues)
    Toast.success('分配权限成功')
    onCancel()
  }

  function onChange(values: any) {
    setSelectedValues(values)
  }

  return (
    <Modal
      title="分配权限"
      visible={visible}
      closeOnEsc={true}
      onCancel={() => onCancel()}
      onOk={() => onOk()}
    >
      <Tree
        treeData={treeData}
        multiple
        showLine
        defaultExpandAll
        onChange={onChange}
        autoMergeValue={false}
        defaultValue={defaultValue}
        directory
        style={{ width: '100%', height: '100%' }}
      />
    </Modal>
  )
}
