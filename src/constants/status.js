export const TASK_STATUS = {
    TODO: 1,
    IN_PROGRESS: 2,
    DONE: 3
  };
  
  export const TASK_STATUS_LABELS = {
    [TASK_STATUS.TODO]: 'To Do',
    [TASK_STATUS.IN_PROGRESS]: 'In Progress',
    [TASK_STATUS.DONE]: 'Done'
  };
  
  export const TASK_STATUS_COLORS = {
    [TASK_STATUS.TODO]: 'blue',
    [TASK_STATUS.IN_PROGRESS]: 'orange',
    [TASK_STATUS.DONE]: 'green'
  };
  
  // Helper function to get status label
  export const getStatusLabel = (status) => {
    return TASK_STATUS_LABELS[status] || 'Unknown';
  };
  
  // Helper function to get status color
  export const getStatusColor = (status) => {
    return TASK_STATUS_COLORS[status] || 'default';
  }; 