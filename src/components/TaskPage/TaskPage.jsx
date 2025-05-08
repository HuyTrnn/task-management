import React, { useState, useEffect, useCallback } from "react";
import Lists from "../Lists/Lists";
import Time from "../Time/Time";
import TaskForm from "../TaskForm/TaskForm";
import { Button, Form, Select } from "antd";
import { getTasks, addTask, updateTask, deleteTask } from "../../services/taskService";
import { ToastContainer } from 'react-toastify';
import { showSuccessToast, showErrorToast } from "../../services/toastService";
import { useOutletContext } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

export default function TaskPage({ status }) {
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [isLoading, setIsLoading] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const { selectedTask, isModalVisible, onModalClose } = useOutletContext();

  const loadTasks = useCallback(() => {
    setIsLoading(true);
    try {
      const loadedTasks = getTasks();
      const filteredTasks = status 
        ? loadedTasks.filter(task => task.status === status)
        : loadedTasks;
      setTasks(filteredTasks);
      setFilteredTasks(filteredTasks);
    } catch {
      showErrorToast('Failed to load tasks');
    } finally {
      setIsLoading(false);
    }
  }, [status]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleCreateTask = async (values) => {
    setIsLoading(true);
    try {
      const taskValues = status ? { ...values, status } : values;
      const newTask = addTask(taskValues);
      if (newTask) {
        setTasks(prevTasks => [newTask, ...prevTasks]);
        showSuccessToast('Task created successfully!');
        setIsTaskFormOpen(false);
      } else {
        showErrorToast('Failed to create task');
      }
    } catch {
      showErrorToast('Failed to create task');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTask = async (taskId, updatedValues) => {
    setIsLoading(true);
    try {
      const updatedTask = updateTask(taskId, updatedValues);
      if (updatedTask) {
        setTasks(prevTasks => 
          prevTasks.map(task => 
            task.id === taskId ? { ...task, ...updatedTask } : task
          )
        );
        showSuccessToast('Task updated successfully!');
        setIsTaskFormOpen(false);
        setEditingTask(null);
      } else {
        showErrorToast('Failed to update task');
      }
    } catch {
      showErrorToast('Failed to update task');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    setIsLoading(true);
    try {
      if (deleteTask(taskId)) {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        showSuccessToast('Task deleted successfully!');
      } else {
        showErrorToast('Failed to delete task');
      }
    } catch {
      showErrorToast('Failed to delete task');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsTaskFormOpen(true);
  };

  const handleFormClose = () => {
    setIsTaskFormOpen(false);
    setEditingTask(null);
  };

  const handleFormSubmit = async (values) => {
    if (editingTask) {
      await handleUpdateTask(editingTask.id, values);
    } else {
      await handleCreateTask(values);
    }
  };

  const handlePriorityChange = (value) => {
    if (!value) {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter(task => task.priority === value);
      setFilteredTasks(filtered);
    }
  };  

  return (
    <div className="h-full md:m-0 mt-8 px-4 sm:px-6 lg:px-8 py-8">
      <ToastContainer />
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <Time />
          <div>
            <Button 
              onClick={() => {
                setEditingTask(null);
                setIsTaskFormOpen(true);
              }} 
              color="primary" 
              variant="filled"
              loading={isLoading}
            >
              Add new task
            </Button>
          </div>
        </div>

        <Form.Item name="priority">
          <Select
            placeholder="Filter by priority"
            allowClear
            onChange={handlePriorityChange}
            className="w-full"
          >
            <Select.Option value={1}>Urgent</Select.Option>
            <Select.Option value={2}>Medium</Select.Option>
            <Select.Option value={3}>Low</Select.Option>
          </Select>
        </Form.Item>

        <div>
          <Lists 
            tasks={filteredTasks}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
            isLoading={isLoading}
            selectedTask={selectedTask}
            isModalVisible={isModalVisible}
            onModalClose={onModalClose}
          />
        </div>
      </div>

      <TaskForm 
        isOpen={isTaskFormOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        isLoading={isLoading}
        editTask={editingTask}
      />
    </div>
  );
} 