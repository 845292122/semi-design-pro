import { Col, Form, Row, Table, Tag, Toast } from '@douyinfe/semi-ui'
import React, { useEffect, useRef, useState } from 'react'
import { tenantApi } from '~/api'
import DataTableCard from '~/components/DataTableCard'
import InfoSheet from '~/components/InfoSheet'
import MoreAction from '~/components/MoreAction'
import SearchCard from '~/components/SearchCard'
import SearchForm, { SearchFormItem } from '~/components/SearchForm'
import { extractDateRange } from '~/utils/date.util'
import * as dateFns from 'date-fns'
import PermModal from '~/components/PermModal'
import { convertToTreeData, extractTitlesAndPermissions } from '~/utils/tree.util'
import bizRoutes from '~/router/routes'

export default function Tenant() {
  const infoFormRef = useRef<any>()
  const [queryParam, setQueryParam] = useState({})
  const [initValues, setInitValues] = useState({})
  const [pageParam, setPageParam] = useState({ pageNo: 1, pageSize: 10 })
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState<TenantType.Info[]>([])
  const [recordTotal, setRecordTotal] = useState(0)
  const [visible, setVisible] = useState(false)
  const [permModalVisible, setPermModalVisible] = useState(false)
  const [permTreeData, setPermTreeData] = useState<any[]>([])
  const [defaultPermTreeValue, setDefaultPermTreeValue] = useState<any[]>([])
  const [currentTenantID, setCurrentTenantID] = useState<number | undefined>()

  const searchColumns: SearchFormItem[] = [
    {
      label: '联系人',
      field: 'contactName',
      type: 'input'
    },
    {
      label: '公司名称',
      field: 'companyName',
      type: 'input'
    },
    {
      label: '状态',
      field: 'status',
      type: 'select',
      options: [
        {
          label: '未使用',
          value: 0
        },
        {
          label: '试用中',
          value: 1
        },
        {
          label: '试用结束',
          value: 2
        },
        {
          label: '正在使用',
          value: 3
        },
        {
          label: '已过期',
          value: 4
        }
      ]
    }
  ]

  async function fetchUserData(params: any) {
    try {
      setLoading(true)
      const data: any = await tenantApi.page(params)
      setDataSource(data.records)
      setRecordTotal(data.total)
    } finally {
      setLoading(false)
    }
  }
  async function handleQuery() {
    setPageParam({ pageNo: 1, pageSize: 10 })
    await fetchUserData({ ...pageParam, ...queryParam })
  }

  function formChange(param: any) {
    setQueryParam(param)
  }

  function handlePageChange(page: any) {
    setPageParam({
      pageNo: page,
      pageSize: pageParam.pageSize
    })
  }

  function handleAdd() {
    setInitValues({
      isPremium: 0,
      userCount: 10
    })
    setVisible(true)
  }

  async function handleAssignPerm(id: number) {
    const perms: any = await tenantApi.perms(id)
    const routeTree = extractTitlesAndPermissions(bizRoutes)
    setPermTreeData(convertToTreeData(routeTree))
    setCurrentTenantID(id)
    setDefaultPermTreeValue(perms)
    setPermModalVisible(true)
  }

  function cancelAssignPerm() {
    setPermModalVisible(false)
  }

  async function handleEdit(id: number) {
    const tenantInfo = await tenantApi.info(id)
    setInitValues(tenantInfo)
    setVisible(true)
  }

  async function handleRemove(id: number) {
    await tenantApi.remove(id)
    await handleRefresh()
    Toast.success('删除成功')
  }

  function handleRefresh() {
    fetchUserData({ ...pageParam, ...queryParam })
  }

  async function handleSubmit() {
    const val = await infoFormRef.current.validate()
    if (!val) return

    extractDateRange('subscriptionDate', val, ['trialStartDate', 'trialEndDate'])
    extractDateRange('trialDate', val, ['startDate', 'endDate'])
    if (val.id) {
      await tenantApi.modify(val)
      Toast.success('修改成功')
    } else {
      await tenantApi.create(val)
      Toast.success('添加成功')
    }
    setVisible(false)
    await fetchUserData({ ...pageParam })
  }

  async function assignPerms(id: number, perms: string[]) {
    await tenantApi.assignPerms({
      id,
      perms
    })
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
      <DataTableCard handleAdd={handleAdd} handleRefresh={handleRefresh} title="租户列表">
        <Table
          dataSource={dataSource}
          loading={loading}
          scroll={{ x: 2200 }}
          pagination={{
            currentPage: pageParam.pageNo,
            pageSize: pageParam.pageSize,
            total: recordTotal,
            onPageChange: handlePageChange
          }}
        >
          <Table.Column title="ID" dataIndex="id" key="id" width={50} fixed="left" />
          <Table.Column
            title="公司名称"
            dataIndex="companyName"
            key="companyName"
            width={150}
            fixed="left"
          />
          <Table.Column title="联系人" dataIndex="contactName" key="contactName" width={120} />
          <Table.Column title="手机号" dataIndex="contactPhone" key="contactPhone" width={150} />
          <Table.Column
            title="统一社会信用代码"
            dataIndex="licenseNumber"
            key="licenseNumber"
            width={150}
            ellipsis={true}
          />
          <Table.Column
            title="地址"
            dataIndex="address"
            key="address"
            width={150}
            ellipsis={true}
          />
          <Table.Column title="域名" dataIndex="domain" key="domain" width={150} ellipsis={true} />
          <Table.Column title="备注" dataIndex="remark" key="remark" width={150} ellipsis={true} />
          <Table.Column title="用户数量" dataIndex="userCount" key="userCount" width={100} />
          <Table.Column
            title="试用开始时间"
            dataIndex="trialStartDate"
            key="trialStartDate"
            width={150}
            render={text => dateFns.format(new Date(text), 'yyyy-MM-dd')}
          />
          <Table.Column
            title="试用结束时间"
            dataIndex="trialEndDate"
            key="trialEndDate"
            width={150}
            render={text => dateFns.format(new Date(text), 'yyyy-MM-dd')}
          />
          <Table.Column
            title="状态"
            dataIndex="status"
            key="status"
            width={100}
            render={text => {
              switch (Number(text)) {
                case 0:
                  return <Tag color="white"> 未使用 </Tag>
                case 1:
                  return <Tag color="cyan"> 试用中 </Tag>
                case 2:
                  return <Tag color="red"> 试用结束 </Tag>
                case 3:
                  return <Tag color="lime"> 正在使用 </Tag>
                case 4:
                  return <Tag color="yellow">已过期 </Tag>
              }
            }}
          />
          <Table.Column
            title="开始时间"
            dataIndex="startDate"
            key="startDate"
            width={150}
            render={text => dateFns.format(new Date(text), 'yyyy-MM-dd')}
          />
          <Table.Column
            title="结束时间"
            dataIndex="endDate"
            key="endDate"
            width={150}
            render={text => dateFns.format(new Date(text), 'yyyy-MM-dd')}
          />
          <Table.Column
            title="PREMIUM"
            dataIndex="isPremium"
            key="isPremium"
            width={100}
            render={text => (Number(text) === 1 ? <Tag color="amber"> 是 </Tag> : <Tag> 否 </Tag>)}
          />
          <Table.Column
            title="操作"
            width="250"
            fixed="right"
            align="center"
            dataIndex="operate"
            key="operate"
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
        title="租户信息"
        visible={visible}
        onCancel={() => setVisible(false)}
        onSubmit={handleSubmit}
      >
        <Form
          style={{ width: '100%' }}
          initValues={initValues}
          getFormApi={formApi => (infoFormRef.current = formApi)}
        >
          <Form.Section text="基本信息">
            <Row gutter={24}>
              <Col span={12}>
                <Form.Input
                  field="contactName"
                  label="联系人"
                  rules={[{ required: true, message: '请输入联系人' }]}
                />
              </Col>
              <Col span={12}>
                <Form.Input
                  field="contactPhone"
                  label="联系电话"
                  rules={[{ required: true, message: '请输入联系电话' }]}
                />
              </Col>
              <Col span={12}>
                <Form.Input
                  field="companyName"
                  label="公司名称"
                  rules={[{ required: true, message: '请输入公司名称' }]}
                />
              </Col>
              <Col span={12}>
                <Form.Input field="licenseNumber" label="统一社会信用代码" />
              </Col>
            </Row>
          </Form.Section>
          <Form.Section text="其他信息">
            <Row gutter={24}>
              <Col span={12}>
                <Form.Input field="address" label="地址" />
              </Col>
              <Col span={12}>
                <Form.Input field="domain" label="域名" />
              </Col>
              <Col span={12}>
                <Form.InputNumber field="userCount" label="用户数量" max={100} />
              </Col>
              <Col span={12}>
                <Form.RadioGroup
                  label="Premium"
                  field="isPremium"
                  rules={[{ required: true, message: '请选择是否Premium' }]}
                >
                  <Form.Radio value={1}>是</Form.Radio>
                  <Form.Radio value={0}>否</Form.Radio>
                </Form.RadioGroup>
              </Col>
              <Col span={24}>
                <Form.DatePicker
                  type="dateRange"
                  field="trialDate"
                  label="试用时间"
                  position="top"
                  format="yyyy-MM-dd"
                />
              </Col>
              <Col span={24}>
                <Form.DatePicker
                  type="dateRange"
                  field="subscriptionDate"
                  label="订阅时间"
                  position="top"
                  format="yyyy-MM-dd"
                />
              </Col>
              <Col span={24}>
                <Form.TextArea label="备注" field="remark" />
              </Col>
            </Row>
          </Form.Section>
        </Form>
      </InfoSheet>

      <PermModal
        visible={permModalVisible}
        onCancel={cancelAssignPerm}
        treeData={permTreeData}
        defaultValue={defaultPermTreeValue}
        assignPerms={assignPerms}
        id={currentTenantID}
      />
    </React.Fragment>
  )
}
