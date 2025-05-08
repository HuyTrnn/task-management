import React, { useState } from "react";
import { List, Modal, Tag } from "antd";
import ItemTitle from "../Items/ItemTitle";
import ItemContent from "../Items/ItemContent";
import { TASK_PRIORITY } from "../../constants/priority";
import { getStatusLabel, getStatusColor } from "../../constants/status";
import { getPriorityLabel, getPriorityColor } from "../../constants/priority";

const Lists = ({ tasks = [], onEditTask }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleItemClick = (task) => {
    setSelectedTask(task);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedTask(null);
  };

  const handleEditClick = (task) => {
    handleModalClose();
    onEditTask(task);
  };
  
  return (
    <>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 4,
        }}
        className="text-left"
        dataSource={tasks}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            onClick={() => handleItemClick(item)}
            className={`hover:bg-gray-50 transition-colors duration-200 p-4 rounded-lg cursor-pointer ${
              item.priority === TASK_PRIORITY.URGENT ? 'bg-red-50 border-l-4 border-red-500' : ''
            }`}
          >
            <List.Item.Meta
              title={<ItemTitle item={item} onEditTask={() => handleEditClick(item)}/>}
              description={<ItemContent item={item} />}
            />
          </List.Item>
        )}
      />

      <Modal
        title={selectedTask?.title}
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width="90%"
        className="max-w-[600px] mx-auto"
      >
        {selectedTask && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Tag color={getStatusColor(selectedTask.status)}>
                {getStatusLabel(selectedTask.status)}
              </Tag>
              <Tag color={getPriorityColor(selectedTask.priority)}>
                {getPriorityLabel(selectedTask.priority)}
              </Tag>
            </div>
            <div className="text-gray-700">
              <h3 className="font-semibold mb-2">Description</h3>
              <div className="max-h-[40vh] overflow-y-auto whitespace-pre-wrap break-words bg-gray-50 p-3 rounded">
                <p className="text-sm sm:text-base">{selectedTask.content}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Lists;
