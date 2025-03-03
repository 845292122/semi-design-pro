import { IconChevronDown, IconChevronRight, IconMore } from '@douyinfe/semi-icons'
import {
  Button,
  Card,
  Col,
  Collapsible,
  Form,
  Row,
  SideSheet,
  Space,
  Table,
  Typography
} from '@douyinfe/semi-ui'
import React, { useEffect, useState } from 'react'
import SearchForm from './SearchForm'
import { userApi } from '~/api'

// 将 fetchUserData 定义为独立的工具函数
const fetchUserData = async (
  params: ApiType.Page.Param & ApiType.User.Search,
  setLoading: (loading: boolean) => void,
  setDataSource: (data: ApiType.User.Info[]) => void
) => {
  try {
    setLoading(true)
    await userApi.page(params)
    // setDataSource(data?.records || []) // 假设返回的数据结构中包含 records 字段
  } catch (err) {
    console.error(err)
  } finally {
    setLoading(false)
  }
}

const ActionBar = (props: any) => {
  const { handleAdd } = props
  return (
    <Space>
      <Button onClick={handleAdd}>新增</Button>
      <Button>删除</Button>
      <Button>刷新</Button>
    </Space>
  )
}

const SideSheetFooter = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button style={{ marginRight: 8 }}>重置</Button>
      <Button theme="solid">提交</Button>
    </div>
  )
}

export default function User() {
  const [isOpen, setOpen] = useState<boolean>()
  const [dataSource, setDataSource] = useState<ApiType.User.Info[]>([])
  const [loading, setLoading] = useState(false)
  const [pageParam, setPageParam] = useState({ pageNo: 1, pageSize: 10 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // fetchUserData({ ...pageParam })
    fetchUserData({ ...pageParam }, setLoading, setDataSource)
  }, [pageParam])

  const toggleSearchBar = () => {
    setOpen(!isOpen)
  }

  const handleAdd = () => {
    setVisible(true)
  }

  return (
    <React.Fragment>
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
          <ActionBar handleAdd={handleAdd} />
        </Row>
        <Table>
          <Table.Column title="用户名" dataIndex="username" key="username" />
          <Table.Column title="昵称" dataIndex="nickname" key="nickname" />
          <Table.Column title="主账号" dataIndex="isMaster" key="isMaster" />
          <Table.Column title="邮箱" dataIndex="email" key="email" />
          <Table.Column title="手机号" dataIndex="phone" key="phone" />
          <Table.Column title="头像" dataIndex="avatar" key="avatar" />
          <Table.Column title="状态" dataIndex="status" key="status" />
          <Table.Column title="备注" dataIndex="remark" key="remark" />
          <Table.Column title="" dataIndex="operate" key="operate" render={() => <IconMore />} />
        </Table>
      </div>

      <SideSheet
        title="用户信息"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={<SideSheetFooter />}
      >
        <Form style={{ padding: 10, width: '100%' }}>
          {/* TODO 需要 根据实际需求进行修改 */}
          <Form.Section text={'高级信息'}>
            <Row gutter={24}>
              <Col span={24}>
                <Form.Select field="tenantId" label="所属租户" style={{ width: '100%' }}>
                  <Form.Select.Option value={1}>租户1</Form.Select.Option>
                  <Form.Select.Option value={2}>租户2</Form.Select.Option>
                </Form.Select>
              </Col>
            </Row>
          </Form.Section>
          <Form.Section text={'基本信息'}>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Input
                  label="用户名"
                  field="username"
                  rules={[{ required: true, message: '请输入用户名~' }]}
                />
              </Col>
              <Col span={12}>
                <Form.Input
                  label="昵称"
                  field="nickname"
                  rules={[{ required: true, message: '请输入昵称~' }]}
                />
              </Col>
              <Col span={12}>
                <Form.Input label="邮箱" field="email" />
              </Col>
              <Col span={12}>
                <Form.Input
                  label="手机号"
                  field="phone"
                  rules={[{ required: true, message: '请输入手机号~' }]}
                />
              </Col>
            </Row>
          </Form.Section>
          <Form.Section text={'其他信息'}>
            <Row gutter={24}>
              <Col span={12}>
                <Form.RadioGroup
                  label="主账号"
                  field="isMaster"
                  rules={[{ required: true, message: '请选择是否是主账号~' }]}
                >
                  <Form.Radio value={1}>是</Form.Radio>
                  <Form.Radio value={0}>否</Form.Radio>
                </Form.RadioGroup>
              </Col>
              <Col span={12}>
                <Form.RadioGroup
                  label="状态"
                  field="status"
                  rules={[{ required: true, message: '请选择用户状态~' }]}
                >
                  <Form.Radio value={1}>正常</Form.Radio>
                  <Form.Radio value={0}>禁用</Form.Radio>
                </Form.RadioGroup>
              </Col>
              <Col span={24}>
                <Form.TextArea label="备注" field="remark" />
              </Col>
            </Row>
          </Form.Section>
        </Form>
      </SideSheet>
    </React.Fragment>
  )
}
