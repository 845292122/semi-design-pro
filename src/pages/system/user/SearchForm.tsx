import { Button, Col, Form, Row, Space } from '@douyinfe/semi-ui'
import { useRef } from 'react'

export default function SearchForm(props: any) {
  const { fetchUserData } = props
  const queryForm: any = useRef()

  const handleQuery = async () => {
    const initPageParam = { pageNo: 1, pageSize: 10 }
    const queryParam = queryForm.current.getValues() ?? {}
    await fetchUserData({ ...initPageParam, ...queryParam })
  }

  const handleReset = () => {
    queryForm.current.reset()
  }

  return (
    <Form style={{ padding: '10px' }} getFormApi={formApi => (queryForm.current = formApi)}>
      <Row gutter={24}>
        <Col span={6}>
          <Form.Input label="昵称" field="nickname" />
        </Col>
        <Col span={6}>
          <Form.Select label="状态" field="status" style={{ width: '250px' }}>
            <Form.Select.Option value={1}>正常</Form.Select.Option>
            <Form.Select.Option value={0}>禁用</Form.Select.Option>
          </Form.Select>
        </Col>
      </Row>
      <Row>
        <Space>
          <Button type="primary" onClick={handleReset}>
            重置
          </Button>
          <Button type="primary" onClick={handleQuery}>
            查询
          </Button>
        </Space>
      </Row>
    </Form>
  )
}
