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

// 辅助函数：在树数据中查找节点
const findNode = (nodes: any, key: any): any => {
  for (const node of nodes) {
    if (node.key === key) {
      return node
    }
    if (node.children) {
      const found = findNode(node.children, key)
      if (found) {
        found.parent = node
        return found
      }
    }
  }
  return null
}

// TODO 选中逻辑有bug
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
    const parentKeys = new Set()

    // 查找所有选中节点的父节点
    values.forEach((key: any) => {
      const node = findNode(treeData, key)
      let parent = node.parent
      while (parent) {
        parentKeys.add(parent.key)
        parent = parent.parent
      }
    })

    const finalCheckedKeys = new Set([...parentKeys, ...values])
    setSelectedValues([...finalCheckedKeys])
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
        style={{ width: '100%', height: '100%' }}
      />
    </Modal>
  )
}
