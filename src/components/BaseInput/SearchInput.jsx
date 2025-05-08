import { Form, Select } from 'antd';
import { BaseInput } from './BaseInput';

export default function SearchInput({ onSearch, ...props }) {
  const [form] = Form.useForm();

  const handleChange = () => {
    const values = form.getFieldsValue();
    onSearch?.(values);
  };

  return (
    <Form form={form} layout="vertical">
      <div className="space-y-4">
        <Form.Item name="title">
          <BaseInput 
            placeholder="Search by title..." 
            onChange={handleChange}
            {...props}
          />
        </Form.Item>

        <Form.Item name="priority">
          <Select
            placeholder="Filter by priority"
            allowClear
            onChange={handleChange}
            className="w-full"
          >
            <Select.Option value={1}>Urgent</Select.Option>
            <Select.Option value={2}>Medium</Select.Option>
            <Select.Option value={3}>Low</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="status">
          <Select
            placeholder="Filter by status"
            allowClear
            onChange={handleChange}
            className="w-full"
          >
            <Select.Option value={1}>To Do</Select.Option>
            <Select.Option value={2}>In Progress</Select.Option>
            <Select.Option value={3}>Done</Select.Option>
          </Select>
        </Form.Item>
      </div>
    </Form>
  );
}
