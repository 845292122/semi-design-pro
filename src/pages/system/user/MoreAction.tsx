import { IconMore } from '@douyinfe/semi-icons'
import { Button, Dropdown, DropdownItem, DropdownMenu } from '@douyinfe/semi-ui'

export default function MoreAction(props: any) {
  const { handleEdit, userId } = props
  return (
    <Dropdown
      trigger="click"
      position="bottom"
      render={
        <DropdownMenu>
          <DropdownItem onClick={() => handleEdit(userId)}>编辑</DropdownItem>
          <DropdownItem>删除</DropdownItem>
        </DropdownMenu>
      }
    >
      <Button icon={<IconMore />} aria-label="更多" size="small" />
    </Dropdown>
  )
}
