import { IconMore } from '@douyinfe/semi-icons'
import { Button, Dropdown, DropdownItem, DropdownMenu } from '@douyinfe/semi-ui'

export default function MoreAction() {
  return (
    <Dropdown
      trigger="click"
      position="bottom"
      render={
        <DropdownMenu>
          <DropdownItem>编辑</DropdownItem>
          <DropdownItem>删除</DropdownItem>
        </DropdownMenu>
      }
    >
      <Button icon={<IconMore />} aria-label="更多" size="small" />
    </Dropdown>
  )
}
