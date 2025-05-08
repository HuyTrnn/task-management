export const TASK_PRIORITY = {
  LOW: 3,
  MEDIUM: 2,
  URGENT: 1
};

export const TASK_PRIORITY_LABELS = {
  [TASK_PRIORITY.LOW]: 'Low',
  [TASK_PRIORITY.MEDIUM]: 'Medium',
  [TASK_PRIORITY.URGENT]: 'Urgent'
};

export const TASK_PRIORITY_COLORS = {
  [TASK_PRIORITY.LOW]: 'green',
  [TASK_PRIORITY.MEDIUM]: 'orange',
  [TASK_PRIORITY.URGENT]: 'red'
};

export const getPriorityLabel = (priority) => {
  return TASK_PRIORITY_LABELS[priority] || 'Unknown';
};

export const getPriorityColor = (priority) => {
  return TASK_PRIORITY_COLORS[priority] || 'default';
}; 