import { Form, Select, AutoComplete } from 'antd';
import { BaseInput } from './BaseInput';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TASK_STATUS } from '../../constants/status';

export default function SearchInput({ onSearch, tasks = [], onShowModal, ...props }) {
  const [form] = Form.useForm();
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (value) => {
    if (!value) {
      setOptions([]);
      return;
    }

    const filteredTasks = tasks.filter(task => 
      task.title.toLowerCase().includes(value.toLowerCase())
    );

    const newOptions = filteredTasks.map(task => ({
      value: task.title,
      label: (
        <div className="flex justify-between items-center">
          <span>{task.title}</span>
          <span className="text-gray-500 text-sm">
            {task.status === TASK_STATUS.TODO ? 'To Do' : 
             task.status === TASK_STATUS.IN_PROGRESS ? 'In Process' : 'Done'}
          </span>
        </div>
      ),
      task: task
    }));

    setOptions(newOptions);
  };

  const handleSelect = (value, option) => {
    const selectedTask = option.task;
    onShowModal?.(selectedTask);
    
    switch (selectedTask.status) {
      case TASK_STATUS.TODO:
        navigate('/to-do');
        break;
      case TASK_STATUS.IN_PROGRESS:
        navigate('/in-process');
        break;
      case TASK_STATUS.DONE:
        navigate('/completed');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <Form form={form} layout="vertical">
      <div className="space-y-4">
        <Form.Item name="title">
          <AutoComplete
            options={options}
            onSearch={handleSearch}
            onSelect={handleSelect}
            className="w-full"
          >
            <BaseInput 
              placeholder="Search by title..." 
              onChange={(e) => onSearch?.({ title: e.target.value, priority: form.getFieldValue('priority') })}
              {...props}
            />
          </AutoComplete>
        </Form.Item>

       
      </div>
    </Form>
  );
}
