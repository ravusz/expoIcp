import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useBottomSheet } from "@gorhom/bottom-sheet";
import { TASK_STATUSES } from "@/constants";
import { useUpdateTaskStatus } from "@/tasksApi/mutations/useUpdateTaskStatus";
import { TaskStatus } from "@/tasksApi/api";
import Label from "@/components/form/label";
import { translate } from "@/i18n";
import { theme } from "@/theme";
import { FontAwesome } from "@expo/vector-icons";

type Props = {
  projectId: string;
  taskId: string;
  status: TaskStatus;
};

const getButtonIcon = (status: TaskStatus) => {
  switch (status) {
    case TASK_STATUSES.TO_DO:
      return "clipboard";
    case TASK_STATUSES.IN_REVIEW:
      return "search";
    case TASK_STATUSES.IN_PROGRESS:
      return "cogs";
    case TASK_STATUSES.DONE:
      return "check-circle";
    default:
      return "check-circle";
  }
};

const TaskStatusChanger = ({ projectId, taskId, status }: Props) => {
  const { close } = useBottomSheet();
  const { mutate, isPending } = useUpdateTaskStatus(projectId);

  const handleChangeStatus = (selectedStatus: TaskStatus) => {
    mutate(
      {
        taskId,
        status: selectedStatus,
      },
      {
        onSettled: () => {
          close();
        },
      },
    );
  };

  return (
    <View>
      <Label>{translate("task.CHANGE_TASK_STATUS")}</Label>
      <View style={styles.buttonsContainer}>
        {Object.values(TASK_STATUSES)
          .filter((item) => {
            return item !== status;
          })
          .map((item) => {
            return (
              <TouchableOpacity
                key={item}
                disabled={isPending}
                onPress={() => handleChangeStatus(item)}
                style={[
                  styles.button,
                  { backgroundColor: theme.colors.primary },
                  isPending && styles.disabledButton,
                ]}
              >
                <FontAwesome
                  name={getButtonIcon(item)}
                  size={24}
                  color={theme.colors.white}
                  style={styles.icon}
                />
                <Text style={styles.buttonText}>
                  {translate(`taskStatuses.${item}`)}
                </Text>
              </TouchableOpacity>
            );
          })}
      </View>
    </View>
  );
};

export default TaskStatusChanger;

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "column",
    gap: theme.margin.sm,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.padding.sm,
    paddingHorizontal: theme.padding.md,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.margin.sm,
    justifyContent: "flex-start",
  },
  icon: {
    marginRight: theme.margin.sm,
  },
  buttonText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.white,
  },
  disabledButton: {
    opacity: 0.5,
  },
});
