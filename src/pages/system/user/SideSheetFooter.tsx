import { IconTick } from '@douyinfe/semi-icons'
import { Button, Toast } from '@douyinfe/semi-ui'
import { userApi } from '~/api'

export default function SideSheetFooter({
  userFormRef,
  onCancel,
  fetchUserData,
  fetchUserParam
}: {
  userFormRef: any
  onCancel: () => void
  fetchUserData: (params: any) => void
  fetchUserParam: any
}) {
  const handleSubmit = async () => {
    const val = await userFormRef.current.validate()
    if (!val) return
    if (val.id) {
      // 修改
      await userApi.modify(val)
      Toast.success('修改成功')
    } else {
      // 新增
      await userApi.create(val)
      Toast.success('添加成功')
    }
    onCancel()
    await fetchUserData(fetchUserParam)
  }

  return (
    <Button theme="solid" onClick={handleSubmit} block icon={<IconTick />}>
      提交
    </Button>
  )
}
