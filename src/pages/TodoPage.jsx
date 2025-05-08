import React from "react";
import TaskPage from "../components/TaskPage/TaskPage";
import { TASK_STATUS } from "../constants/status";

export default function TodoPage() {
  return <TaskPage status={TASK_STATUS.TODO} />;
} 