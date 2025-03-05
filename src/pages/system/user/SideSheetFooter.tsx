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
    await userApi.create(val)
    Toast.success('添加成功')
    onCancel()
    await fetchUserData(fetchUserParam)
  }

  return (
    <Button theme="solid" onClick={handleSubmit} block>
      提交
    </Button>
  )
}
