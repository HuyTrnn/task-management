import React from "react";
import {
  getPriorityColor,
  getPriorityText,
  getStatusColor,
  getStatusText,
} from "../../utils/getColorUtils";
import {
  EditFilled,
  StarFilled,
  DeleteOutlined,
} from "@ant-design/icons";
import { Popconfirm, Tag } from "antd";
import { deleteTask } from "../../services/taskService";

export default function ItemTitle({ item, onEditTask }) {
  const onDeleteTask = (id) => {
    deleteTask(id)
  };

  const handleEdit = (task) => {
    onEditTask(task)
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <StarFilled className="text-yellow-400" />
        <a href="#" className="text-lg font-medium hover:text-blue-600">
          {item.title}
        </a>
        <Tag color={getStatusColor(item.status)}>
          {getStatusText(item.status)}
        </Tag>
        <Tag color={getPriorityColor(item.priority)}>
          {getPriorityText(item.priority)} Priority
        </Tag>
      </div>
      <div className="flex items-center space-x-2">
        <EditFilled
          className="cursor-pointer hover:text-blue-600"
          onClick={() => handleEdit(item)}
        />
        <Popconfirm
          title="Delete the task"
          description="Are you sure you want to delete this task?"
          onConfirm={() => onDeleteTask(item.id)}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined className="cursor-pointer hover:text-red-600" />
        </Popconfirm>
      </div>
    </div>
  );
}
