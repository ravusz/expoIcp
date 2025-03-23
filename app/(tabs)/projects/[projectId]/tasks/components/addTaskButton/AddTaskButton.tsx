import React from "react";
import { useLocalSearchParams } from "expo-router";

import LinkButton from "@/components/linkButton";
import { translate } from "@/i18n";

const AddTaskButton = () => {
  const { projectId }: { projectId: string } = useLocalSearchParams();

  return (
    <LinkButton href={`projects/${projectId}/tasks/addTask`} iconName="add">
      {translate("task.addNewTask")}
    </LinkButton>
  );
};

export default AddTaskButton;
