import React, { useState, useEffect, useCallback } from "react";
import Lists from "../components/Lists/Lists";
import Time from "../components/Time/Time";
import TaskForm from "../components/TaskForm/TaskForm";
import { Button } from "antd";
import { getTasks, addTask, updateTask, deleteTask } from "../services/taskService";
import { ToastContainer } from 'react-toastify';
import { showSuccessToast, showErrorToast } from "../services/toastService";
import 'react-toastify/dist/ReactToastify.css';

export default function CompletedPage() {
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const loadTasks = useCallback(() => {
    setIsLoading(true);
    try {
      const allTasks = getTasks();
      // Filter tasks with status "Done" (status === 3)
      const completedTasks = allTasks.filter(task => task.status === 3);
      setTasks(completedTasks);
    } catch {
      showErrorToast('Failed to load completed tasks');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleCreateTask = async (values) => {
    setIsLoading(true);
    try {
      const newTask = addTask(values);
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

  return (
    <div className="h-full px-4 sm:px-6 lg:px-8 py-8">
      <ToastContainer />
      <div className="flex justify-between">
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
      <div>
        <Lists 
          tasks={tasks}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
          isLoading={isLoading}
        />
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