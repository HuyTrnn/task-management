import React from "react";
import { List } from "antd";
import ItemTitle from "../Items/ItemTitle";
import ItemContent from "../Items/ItemContent";

const Lists = ({ tasks = [], onEditTask }) => {
  const handleItemClick = (task) => {
    onEditTask(task);
  };

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 4,
      }}
      className="text-left"
      dataSource={tasks}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          className="hover:bg-gray-50 transition-colors duration-200 p-4 rounded-lg cursor-pointer"
        >
          <List.Item.Meta
            title={<ItemTitle item={item} onEditTask={() => handleItemClick(item)}/>}
            description={<ItemContent item={item} />}
          />
        </List.Item>
      )}
    />
  );
};

export default Lists;
