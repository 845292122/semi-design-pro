import {
  IconChevronDown,
  IconChevronRight,
  IconClear,
  IconComment,
  IconMore,
  IconTickCircle
} from '@douyinfe/semi-icons'
import {
  Avatar,
  Button,
  Card,
  Collapsible,
  Row,
  Space,
  Table,
  Tag,
  Typography
} from '@douyinfe/semi-ui'
import React, { useState } from 'react'
import SearchForm from './SearchForm'

const columns = [
  {
    title: '标题',
    dataIndex: 'name',
    render: (text, record, index) => {
      return (
        <div>
          <Avatar
            size="small"
            shape="square"
            src={record.nameIconSrc}
            style={{ marginRight: 12 }}
          ></Avatar>
          {text}
        </div>
      )
    }
  },
  {
    title: '大小',
    dataIndex: 'size'
  },
  {
    title: '交付状态',
    dataIndex: 'status',
    render: text => {
      const tagConfig = {
        success: { color: 'green', prefixIcon: <IconTickCircle />, text: '已交付' },
        pending: { color: 'pink', prefixIcon: <IconClear />, text: '已延期' },
        wait: { color: 'cyan', prefixIcon: <IconComment />, text: '待评审' }
      }
      const tagProps = tagConfig[text]
      return (
        <Tag shape="circle" {...tagProps} style={{ userSelect: 'text' }}>
          {tagProps.text}
        </Tag>
      )
    }
  },
  {
    title: '所有者',
    dataIndex: 'owner',
    render: (text, record, index) => {
      return (
        <div>
          <Avatar size="small" color={record.avatarBg} style={{ marginRight: 4 }}>
            {typeof text === 'string' && text.slice(0, 1)}
          </Avatar>
          {text}
        </div>
      )
    }
  },
  {
    title: '更新日期',
    dataIndex: 'updateTime'
  },
  {
    title: '',
    dataIndex: 'operate',
    render: () => {
      return <IconMore />
    }
  }
]
const data = [
  {
    key: '1',
    name: 'Semi Design 设计稿.fig',
    nameIconSrc:
      'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png',
    size: '2M',
    owner: '姜鹏志',
    status: 'success',
    updateTime: '2020-02-02 05:13',
    avatarBg: 'grey'
  },
  {
    key: '2',
    name: 'Semi Design 分享演示文稿',
    nameIconSrc:
      'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
    size: '2M',
    owner: '郝宣',
    status: 'pending',
    updateTime: '2020-01-17 05:31',
    avatarBg: 'red'
  },
  {
    key: '3',
    name: '设计文档',
    nameIconSrc:
      'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
    size: '34KB',
    status: 'wait',
    owner: 'Zoey Edwards',
    updateTime: '2020-01-26 11:01',
    avatarBg: 'light-blue'
  }
]

export default function User() {
  const [isOpen, setOpen] = useState<boolean>()
  const toggle = () => {
    setOpen(!isOpen)
  }

  const ActionBar = () => {
    return (
      <Space>
        <Button>新增</Button>
        <Button>删除</Button>
        <Button>刷新</Button>
      </Space>
    )
  }

  return (
    <React.Fragment>
      <Card>
        <Typography.Text
          onClick={toggle}
          icon={isOpen ? <IconChevronDown /> : <IconChevronRight />}
          style={{ cursor: 'pointer', userSelect: 'none' }}
          strong
          copyable={false}
          size="inherit"
        >
          快速搜索
        </Typography.Text>
        <Collapsible isOpen={isOpen}>
          <SearchForm />
        </Collapsible>
      </Card>

      <div
        style={{
          backgroundColor: '#fff',
          padding: '15px 20px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          marginTop: '15px'
        }}
      >
        <Row
          type="flex"
          justify="space-between"
          style={{
            alignItems: 'center',
            marginBottom: '10px'
          }}
        >
          <Typography.Title heading={6}>用户列表</Typography.Title>
          <ActionBar />
        </Row>
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>
    </React.Fragment>
  )
}
