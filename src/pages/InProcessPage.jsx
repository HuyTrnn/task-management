import React from "react";
import TaskPage from "../components/TaskPage/TaskPage";
import { TASK_STATUS } from "../constants/status";

export default function InProcessPage() {
  return <TaskPage status={TASK_STATUS.IN_PROGRESS} />;
} 