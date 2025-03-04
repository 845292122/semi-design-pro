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
  Toast,
  Typography
} from '@douyinfe/semi-ui'
import React, { useEffect, useRef, useState } from 'react'
import SearchForm from './SearchForm'
import { userApi } from '~/api'

// TODO 将 fetchUserData 定义为独立的工具函数
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
      <Button>刷新</Button>
    </Space>
  )
}

const SideSheetFooter = ({ userFormRef, onCancel }: { userFormRef: any; onCancel: () => void }) => {
  const handleSubmit = async () => {
    const val = await userFormRef.current.validate()
    if (!val) return
    await userApi.create(val)
    Toast.success('添加成功')
    onCancel()
  }

  return (
    <Button theme="solid" onClick={handleSubmit} block>
      提交
    </Button>
  )
}

export default function User() {
  const userForm = useRef<any>()
  const [isOpen, setOpen] = useState<boolean>()
  const [dataSource, setDataSource] = useState<ApiType.User.Info[]>([])
  const [loading, setLoading] = useState(false)
  const [pageParam, setPageParam] = useState({ pageNo: 1, pageSize: 10 })
  const [visible, setVisible] = useState(false)
  const [initValues, setInitValues] = useState({})

  useEffect(() => {
    const fetchUserData = async (params: any) => {
      try {
        setLoading(true)
        const data: any = await userApi.page(params)
        setDataSource(data.records)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData({ ...pageParam })
  }, [pageParam])

  const toggleSearchBar = () => {
    setOpen(!isOpen)
  }

  const handleAdd = () => {
    setInitValues({
      status: 1,
      isMaster: 0
    })
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
        <Table dataSource={dataSource} loading={loading}>
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
        maskClosable={false}
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={<SideSheetFooter userFormRef={userForm} onCancel={() => setVisible(false)} />}
      >
        <Form
          style={{ width: '100%' }}
          initValues={initValues}
          getFormApi={formApi => (userForm.current = formApi)}
        >
          {/* TODO 需要 根据实际需求进行修改 */}
          <Form.Section text={'高级信息'}>
            <Row gutter={24}>
              <Col span={24}>
                <Form.Select
                  field="tenantID"
                  label="所属租户"
                  style={{ width: '100%' }}
                  rules={[{ required: true, message: '请选择所属租户~' }]}
                >
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
