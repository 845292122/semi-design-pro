import { Button, Col, Form, Row, Space } from '@douyinfe/semi-ui'

export default function SearchForm() {
  return (
    <Form style={{ padding: '10px' }}>
      <Row gutter={24}>
        <Col span={6}>
          <Form.Input label="用户名" field="username" />
        </Col>
        <Col span={6}>
          <Form.Input label="手机号" field="phone" />
        </Col>
        <Col span={6}>
          <Form.Input label="公司名称" field="companyName" />
        </Col>
        <Col span={6}>
          <Form.Select label="业务线" field="business1" style={{ width: '250px' }}>
            <Form.Select.Option value="abc">Semi</Form.Select.Option>
            <Form.Select.Option value="ulikeCam">轻颜相机</Form.Select.Option>
            <Form.Select.Option value="toutiao">今日头条</Form.Select.Option>
          </Form.Select>
        </Col>
      </Row>
      <Row>
        <Space>
          <Button type="primary">重置</Button>
          <Button type="primary">查询</Button>
        </Space>
      </Row>
    </Form>
  )
}
