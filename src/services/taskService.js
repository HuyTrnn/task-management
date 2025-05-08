const STORAGE_KEY = 'tasks';

// Get all tasks from localStorage
export const getTasks = () => {
  try {
    const tasks = localStorage.getItem(STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error('Error getting tasks from localStorage:', error);
    return [];
  }
};

// Save all tasks to localStorage
export const saveTasks = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    return true;
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
    return false;
  }
};

// Add a new task
export const addTask = (task) => {
  try {
    const tasks = getTasks();
    const newTask = {
      ...task,
      id: Date.now().toString(), // Generate unique ID
      createdAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    saveTasks(tasks);
    return newTask;
  } catch (error) {
    console.error('Error adding task:', error);
    return null;
  }
};

// Update an existing task
export const updateTask = (taskId, updatedTask) => {
  try {
    const tasks = getTasks();
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex === -1) return null;
    
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...updatedTask,
      updatedAt: new Date().toISOString(),
    };
    
    saveTasks(tasks);
    return tasks[taskIndex];
  } catch (error) {
    console.error('Error updating task:', error);
    return null;
  }
};

// Delete a task
export const deleteTask = (taskId) => {
  try {
    const tasks = getTasks();
    const filteredTasks = tasks.filter(task => task.id !== taskId);
    saveTasks(filteredTasks);
    return true;
  } catch (error) {
    console.error('Error deleting task:', error);
    return false;
  }
};

// Get a single task by ID
export const getTaskById = (taskId) => {
  try {
    const tasks = getTasks();
    return tasks.find(task => task.id === taskId) || null;
  } catch (error) {
    console.error('Error getting task by ID:', error);
    return null;
  }
};

// Update task status
export const updateTaskStatus = (taskId, status) => {
  return updateTask(taskId, { status });
};

// Update task priority
export const updateTaskPriority = (taskId, priority) => {
  return updateTask(taskId, { priority });
};

// Get tasks by status
export const getTasksByStatus = (status) => {
  try {
    const tasks = getTasks();
    return tasks.filter(task => task.status === status);
  } catch (error) {
    console.error('Error getting tasks by status:', error);
    return [];
  }
};

// Get tasks by priority
export const getTasksByPriority = (priority) => {
  try {
    const tasks = getTasks();
    return tasks.filter(task => task.priority === priority);
  } catch (error) {
    console.error('Error getting tasks by priority:', error);
    return [];
  }
};

// Clear all tasks
export const clearAllTasks = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing tasks:', error);
    return false;
  }
}; 