import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Button from "@/components/button";
import { translate } from "@/i18n";

import { TASK_STATUSES } from "@/tasks/constants";
import { useUpdateTaskStatus } from "@/tasksApi/mutations/useUpdateTaskStatus";
import { TaskStatus } from "@/tasksApi/api";

type Props = {
  projectId: string;
  taskId: string;
  status: TaskStatus;
};

const TaskStatusChanger = ({ projectId, taskId, status }: Props) => {
  const { mutate, isPending } = useUpdateTaskStatus(projectId);

  const handleChangeStatus = (selectedStatus: TaskStatus) => {
    mutate({
      taskId,
      status: selectedStatus,
    });
  };

  return (
    <View style={styles.container}>
      <Text>Zmien status zadania</Text>
      <View style={styles.buttonsContainer}>
        {Object.values(TASK_STATUSES)
          .filter((item) => {
            return item !== status;
          })
          .map((item) => {
            return (
              <Button
                key={item}
                disabled={isPending}
                onPress={() => handleChangeStatus(item)}
              >
                {translate(`taskStatuses.${item}`)}
              </Button>
            );
          })}
      </View>
    </View>
  );
};

export default TaskStatusChanger;

const styles = StyleSheet.create({
  container: {},
  buttonsContainer: {
    flexDirection: "column",
    gap: 8,
  },
});
