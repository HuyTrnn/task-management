import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Button, DatePicker } from 'antd';
import { showErrorToast } from '../../services/toastService';
import dayjs from 'dayjs';

const { TextArea } = Input;

const TaskForm = ({ isOpen, onClose, onSubmit, isLoading, editTask }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editTask) {
      form.setFieldsValue({
        ...editTask,
        startDate: editTask.startDate ? dayjs(editTask.startDate) : null,
        endDate: editTask.endDate ? dayjs(editTask.endDate) : null,
      });
    } else {
      form.resetFields();
    }
  }, [editTask, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      // Convert dates to ISO string for storage
      const formattedValues = {
        ...values,
        startDate: values.startDate?.toISOString(),
        endDate: values.endDate?.toISOString(),
      };
      await onSubmit(formattedValues);
    } catch (error) {
      console.error('Validation failed:', error);
      showErrorToast('Please fill in all required fields correctly');
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={editTask ? "Edit Task" : "Create New Task"}
      open={isOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel} disabled={isLoading}>
          Cancel
        </Button>,
        <Button 
          key="submit" 
          type="primary" 
          onClick={handleSubmit}
          loading={isLoading}
        >
          {editTask ? "Update Task" : "Create Task"}
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        className="mt-4"
        disabled={isLoading}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter task title' }]}
        >
          <Input placeholder="Enter task title" />
        </Form.Item>

        <Form.Item
          name="content"
          label="Content"
          rules={[{ message: 'Please enter task content' }]}
        >
          <TextArea 
            placeholder="Enter task description"
            rows={4}
          />
        </Form.Item>

        <Form.Item
          name="startDate"
          label="Start Date"
          rules={[{ message: 'Please select start date' }]}
        >
          <DatePicker 
            className="w-full"
            showTime
            format="YYYY-MM-DD HH:mm"
            placeholder="Select start date and time"
          />
        </Form.Item>

        <Form.Item
          name="endDate"
          label="End Date"
          rules={[
            { message: 'Please select end date' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || !getFieldValue('startDate') || value.isAfter(getFieldValue('startDate'))) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('End date must be after start date'));
              },
            }),
          ]}
        >
          <DatePicker 
            className="w-full"
            showTime
            format="YYYY-MM-DD HH:mm"
            placeholder="Select end date and time"
          />
        </Form.Item>

        <Form.Item
          name="priority"
          label="Priority"
          rules={[{ required: true, message: 'Please select priority' }]}
        >
          <Select placeholder="Select priority">
            <Select.Option value={1}>Urgent</Select.Option>
            <Select.Option value={2}>Medium</Select.Option>
            <Select.Option value={3}>Low</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: 'Please select status' }]}
        >
          <Select placeholder="Select status">
            <Select.Option value={1}>To Do</Select.Option>
            <Select.Option value={2}>In Progress</Select.Option>
            <Select.Option value={3}>Done</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskForm; 