import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Button, DatePicker } from 'antd';
import { showErrorToast } from '../../services/toastService';
import dayjs from 'dayjs';
import { TASK_STATUS, TASK_STATUS_LABELS } from '../../constants/status';
import { TASK_PRIORITY, TASK_PRIORITY_LABELS } from '../../constants/priority';

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
      const formattedValues = {
        ...values,
        startDate: values.startDate?.toISOString(),
        endDate: values.endDate?.toISOString(),
      };
      await onSubmit(formattedValues);
    } catch (error) {
      console.error('Add failed:', error);
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
            <Select.Option value={TASK_PRIORITY.LOW}>{TASK_PRIORITY_LABELS[TASK_PRIORITY.LOW]}</Select.Option>
            <Select.Option value={TASK_PRIORITY.MEDIUM}>{TASK_PRIORITY_LABELS[TASK_PRIORITY.MEDIUM]}</Select.Option>
            <Select.Option value={TASK_PRIORITY.URGENT}>{TASK_PRIORITY_LABELS[TASK_PRIORITY.URGENT]}</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: 'Please select status' }]}
        >
          <Select placeholder="Select status">
            <Select.Option value={TASK_STATUS.TODO}>{TASK_STATUS_LABELS[TASK_STATUS.TODO]}</Select.Option>
            <Select.Option value={TASK_STATUS.IN_PROGRESS}>{TASK_STATUS_LABELS[TASK_STATUS.IN_PROGRESS]}</Select.Option>
            <Select.Option value={TASK_STATUS.DONE}>{TASK_STATUS_LABELS[TASK_STATUS.DONE]}</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskForm; 