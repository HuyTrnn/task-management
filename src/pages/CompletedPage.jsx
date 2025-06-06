import React from "react";
import TaskPage from "../components/TaskPage/TaskPage";
import { TASK_STATUS } from "../constants/status";

export default function CompletedPage() {
  return <TaskPage status={TASK_STATUS.DONE} />;
} 