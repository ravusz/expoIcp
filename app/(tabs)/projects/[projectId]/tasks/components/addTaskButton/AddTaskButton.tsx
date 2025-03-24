import React from "react";
import { useLocalSearchParams } from "expo-router";

import LinkButton from "@/components/linkButton";
import { useTranslation } from "react-i18next";

const AddTaskButton = () => {
  const { t } = useTranslation();

  const { projectId }: { projectId: string } = useLocalSearchParams();

  return (
    <LinkButton href={`projects/${projectId}/tasks/addTask`} iconName="add">
      {t("task.addNewTask")}
    </LinkButton>
  );
};

export default AddTaskButton;
