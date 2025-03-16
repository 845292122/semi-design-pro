import { IconRedo, IconSearch } from '@douyinfe/semi-icons'
import { Button, Col, Form, Row, Space } from '@douyinfe/semi-ui'
import { useRef } from 'react'

export type SearchFormItem = {
  label: string
  field: string
  type: 'input' | 'select'
  options?: Array<{
    label: string
    value: string | number
  }>
}

export type SearchFormProps = {
  searchColumns: SearchFormItem[]
  formChange: (values: any) => void
  handleQuery: () => void
}

export default function SearchForm({ searchColumns, formChange, handleQuery }: SearchFormProps) {
  const searchFormRef: any = useRef()

  const handleReset = () => {
    searchFormRef.current.reset()
    handleQuery()
  }

  return (
    <Form
      style={{ padding: '10px' }}
      getFormApi={formApi => (searchFormRef.current = formApi)}
      onChange={({ values }) => {
        formChange(values)
      }}
    >
      <Row gutter={24}>
        {searchColumns.map(column => (
          <Col span={6}>
            {column.type === 'input' && <Form.Input label={column.label} field={column.field} />}
            {column.type === 'select' && (
              <Form.Select label={column.label} field={column.field} style={{ width: '250px' }}>
                {column.options?.map(option => (
                  <Form.Select.Option label={option.label} value={option.value} />
                ))}
              </Form.Select>
            )}
          </Col>
        ))}
      </Row>

      <Row>
        <Space>
          <Button type="primary" onClick={handleReset} icon={<IconRedo />}>
            重置
          </Button>
          <Button type="primary" onClick={handleQuery} icon={<IconSearch />}>
            查询
          </Button>
        </Space>
      </Row>
    </Form>
  )
}
