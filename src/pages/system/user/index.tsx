import { Col, Form, Row, Table, Tag, Toast } from '@douyinfe/semi-ui'
import React, { useEffect, useRef, useState } from 'react'
import { tenantApi, userApi } from '~/api'
import SearchCard from '~/components/SearchCard'
import DataTableCard from '~/components/DataTableCard'
import InfoSheet from '~/components/InfoSheet'
import SearchForm, { SearchFormItem } from '~/components/SearchForm'
import MoreAction from '~/components/MoreAction'
import PermModal from '~/components/PermModal'
import bizRoutes from '~/router/routes'
import { convertToTreeData, extractTitlesAndPermissions } from '~/utils/tree.util'

export default function User() {
  const userFormRef = useRef<any>()
  const [dataSource, setDataSource] = useState<UserType.Info[]>([])
  const [loading, setLoading] = useState(false)
  const [pageParam, setPageParam] = useState({ pageNo: 1, pageSize: 10 })
  const [queryParam, setQueryParam] = useState({})
  const [visible, setVisible] = useState(false)
  const [initValues, setInitValues] = useState({})
  const [recordTotal, setRecordTotal] = useState(0)
  const [permModalVisible, setPermModalVisible] = useState(false)
  const [permTreeData, setPermTreeData] = useState<any[]>([])
  const [tenantList, setTenantList] = useState<Record<string, number>[]>([])

  const searchColumns: SearchFormItem[] = [
    {
      label: '昵称',
      field: 'nickname',
      type: 'input'
    },
    {
      label: '状态',
      field: 'status',
      type: 'select',
      options: [
        {
          label: '正常',
          value: 1
        },
        {
          label: '禁用',
          value: 0
        }
      ]
    }
  ]

  function formChange(param: any) {
    setQueryParam(param)
  }

  function handleAssignPerm() {
    const routeTree = extractTitlesAndPermissions(bizRoutes)
    setPermTreeData(convertToTreeData(routeTree))
    setPermModalVisible(true)
  }

  function cancelAssignPerm() {
    setPermModalVisible(false)
  }

  async function fetchUserData(params: any) {
    try {
      setLoading(true)
      const data: any = await userApi.page(params)
      setDataSource(data.records)
      setRecordTotal(data.total)
    } finally {
      setLoading(false)
    }
  }

  async function fetchTenantList() {
    const tenantList: any = await tenantApi.list()
    setTenantList(
      tenantList.map((item: { companyName: any; id: any }) => ({
        label: item.companyName,
        value: item.id
      }))
    )
  }

  async function handleQuery() {
    setPageParam({ pageNo: 1, pageSize: 10 })
    await fetchUserData({ ...pageParam, ...queryParam })
  }

  async function handleAdd() {
    await fetchTenantList()
    setInitValues({
      status: 1,
      isMaster: 0
    })
    setVisible(true)
  }

  async function handleEdit(userId: number) {
    await fetchTenantList()
    const userInfo = await userApi.info(userId)
    setInitValues(userInfo)
    setVisible(true)
  }

  function handleRefresh() {
    fetchUserData({ ...pageParam, ...queryParam })
  }

  function handlePageChange(page: any) {
    setPageParam({
      pageNo: page,
      pageSize: pageParam.pageSize
    })
  }

  async function handleSubmit() {
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
    setVisible(false)
    await fetchUserData({ ...pageParam })
  }

  async function handleRemove(userId: number) {
    await userApi.remove(userId)
    await handleRefresh()
    Toast.success('删除成功')
  }

  useEffect(() => {
    fetchUserData({ ...pageParam, ...queryParam })
  }, [pageParam])

  return (
    <React.Fragment>
      <SearchCard>
        <SearchForm
          searchColumns={searchColumns}
          formChange={formChange}
          handleQuery={handleQuery}
        />
      </SearchCard>
      <DataTableCard handleAdd={handleAdd} handleRefresh={handleRefresh} title="用户列表">
        <Table
          dataSource={dataSource}
          loading={loading}
          scroll={{ x: 1100 }}
          pagination={{
            currentPage: pageParam.pageNo,
            pageSize: pageParam.pageSize,
            total: recordTotal,
            onPageChange: handlePageChange
          }}
        >
          <Table.Column title="ID" dataIndex="id" key="id" width={50} fixed="left" />
          <Table.Column title="昵称" dataIndex="nickname" key="nickname" width={100} fixed="left" />
          <Table.Column title="手机号" dataIndex="phone" key="phone" width={150} />
          <Table.Column
            title="主账号"
            dataIndex="isMaster"
            key="isMaster"
            width={100}
            render={text =>
              Number(text) === 1 ? <Tag color="light-blue"> 是 </Tag> : <Tag> 否 </Tag>
            }
          />
          <Table.Column title="邮箱" dataIndex="email" key="email" width={150} />
          <Table.Column
            title="状态"
            dataIndex="status"
            key="status"
            width={100}
            render={text =>
              Number(text) === 1 ? <Tag color="green"> 正常 </Tag> : <Tag color="red"> 禁用 </Tag>
            }
          />
          <Table.Column title="备注" dataIndex="remark" key="remark" ellipsis={true} width={150} />
          <Table.Column
            title="操作"
            align="center"
            dataIndex="operate"
            key="operate"
            fixed="right"
            width={250}
            render={(_, record) => (
              <MoreAction
                handleEdit={handleEdit}
                dataId={record.id}
                handleRemove={handleRemove}
                handleAssignPerm={handleAssignPerm}
              />
            )}
          />
        </Table>
      </DataTableCard>

      <InfoSheet
        title="用户信息"
        visible={visible}
        onCancel={() => setVisible(false)}
        onSubmit={handleSubmit}
      >
        <Form
          style={{ width: '100%' }}
          initValues={initValues}
          getFormApi={formApi => (userFormRef.current = formApi)}
        >
          <Form.Section text={'高级信息'}>
            <Row gutter={24}>
              <Col span={24}>
                <Form.Select
                  field="tenantID"
                  label="所属租户"
                  style={{ width: '100%' }}
                  rules={[{ required: true, message: '请选择所属租户~' }]}
                >
                  {tenantList.map(item => (
                    <Form.Select.Option label={item.label} value={item.value} />
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </Form.Section>
          <Form.Section text={'基本信息'}>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Input
                  label="昵称"
                  field="nickname"
                  rules={[{ required: true, message: '请输入昵称~' }]}
                />
              </Col>
              <Col span={12}>
                <Form.Input
                  label="手机号"
                  field="phone"
                  rules={[{ required: true, message: '请输入手机号~' }]}
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
      </InfoSheet>

      <PermModal visible={permModalVisible} onCancel={cancelAssignPerm} treeData={permTreeData} />
    </React.Fragment>
  )
}
