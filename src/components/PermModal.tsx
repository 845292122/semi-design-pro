import { Modal, Tree } from '@douyinfe/semi-ui'

export type PermModalProps = {
  visible: boolean
  onCancel: () => void
  treeData: Array<any>
}

// TODO 权限分配功能
export default function PermModal({ visible, onCancel, treeData }: PermModalProps) {
  return (
    <Modal title="分配权限" visible={visible} closeOnEsc={true} onCancel={() => onCancel()}>
      <Tree
        treeData={treeData}
        multiple
        defaultExpandAll
        style={{ width: '100%', height: '100%' }}
      />
    </Modal>
  )
}
