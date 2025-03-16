import { IconChevronDown, IconChevronRight } from '@douyinfe/semi-icons'
import { Card, Collapsible, Typography } from '@douyinfe/semi-ui'
import { useState } from 'react'

export default function SearchCard({ children }: { children: React.ReactElement }) {
  const [isOpen, setOpen] = useState<boolean>()

  const toggleSearchBar = () => {
    setOpen(!isOpen)
  }

  return (
    <Card>
      <Typography.Text
        onClick={toggleSearchBar}
        icon={isOpen ? <IconChevronDown /> : <IconChevronRight />}
        style={{ cursor: 'pointer', userSelect: 'none' }}
        strong
        copyable={false}
        size="inherit"
      >
        快速搜索
      </Typography.Text>
      <Collapsible isOpen={isOpen}>{children}</Collapsible>
    </Card>
  )
}
