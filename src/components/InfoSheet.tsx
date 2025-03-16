import { IconTick } from '@douyinfe/semi-icons'
import { Button, SideSheet } from '@douyinfe/semi-ui'

export type InfoSheetProps = {
  title: string
  visible: boolean
  onCancel: () => void
  children: React.ReactElement
  onSubmit: () => void
}

export default function InfoSheet({
  title,
  visible,
  onCancel,
  children,
  onSubmit
}: InfoSheetProps) {
  return (
    <SideSheet
      size="medium"
      title={title}
      maskClosable={false}
      visible={visible}
      onCancel={onCancel}
      footer={
        <Button theme="solid" onClick={onSubmit} block icon={<IconTick />}>
          提交
        </Button>
      }
    >
      {children}
    </SideSheet>
  )
}
