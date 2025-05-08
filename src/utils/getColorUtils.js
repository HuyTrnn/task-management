export const getStatusText = (status) => {
  switch (status) {
    case 1:
      return "To Do";
    case 2:
      return "In Progress";
    case 3:
      return "Completed";
    default:
      return "Unknown";
  }
};

export const getStatusColor = (status) => {
  switch (status) {
    case 1:
      return "red";
    case 2:
      return "blue";
    case 3:
      return "green";
    default:
      return "default";
  }
};

export const getPriorityText = (priority) => {
  switch (priority) {
    case 1:
      return "Urgent";
    case 2:
      return "Medium";
    case 3:
      return "Low";
    default:
      return "Unknown";
  }
};

export const getPriorityColor = (priority) => {
  switch (priority) {
    case 1:
      return "red";
    case 2:
      return "orange";
    case 3:
      return "green";
    default:
      return "default";
  }
};
