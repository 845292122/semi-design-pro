import { Modal, Tree } from '@douyinfe/semi-ui'
import { useState } from 'react'

export type PermModalProps = {
  visible: boolean
  onCancel: () => void
  treeData: Array<any>
  defaultValue: Array<any>
}

export default function PermModal({ visible, onCancel, treeData, defaultValue }: PermModalProps) {
  const [selectedValue, setSelectedValue] = useState([])

  // TODO 权限分配功能
  async function onOk() {
    console.log(selectedValue)
  }

  function onChange(value: any) {
    setSelectedValue(value)
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
        defaultExpandAll
        onChange={onChange}
        autoMergeValue={false}
        defaultValue={defaultValue}
        style={{ width: '100%', height: '100%' }}
      />
    </Modal>
  )
}
