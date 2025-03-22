import React from "react";
import { Link } from "expo-router";
import { useDeleteTask } from "../../api/mutations/useDeleteTask";
import type { TaskResponse } from "../../api/api";
import ActionButton from "@/components/actionButton";
import { View, Alert } from "react-native";
import { translate } from "@/i18n";
import { useRouter } from "expo-router";

type Props = TaskResponse;

const TaskCard = ({ id, projectId, name }: Props) => {
  const { isPending, mutate } = useDeleteTask();
  const router = useRouter();

  const onDelete = () => {
    Alert.alert(
      translate("task.deleteConfirmation.TITLE"),
      translate("task.deleteConfirmation.DESCRIPTION"),
      [
        {
          text: translate("task.deleteConfirmation.CANCEL_BUTTON"),
          style: "cancel",
        },
        {
          text: translate("task.deleteConfirmation.SUBMIT_BUTTON"),
          onPress: () => mutate({ projectId, taskId: id }),
        },
      ],
      { cancelable: true },
    );
  };

  const onEdit = () => {
    router.navigate(`projects/${projectId}/tasks/${id}/editTask`);
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <Link
        href={`projects/${projectId}/tasks/${id}/editTask`}
        style={{
          textAlign: "center",
          marginBottom: 18,
          fontSize: 24,
        }}
      >
        go to task {name}
      </Link>

      <ActionButton
        onPress={onDelete}
        variant="error"
        name="delete-outline"
        isLoading={isPending}
      ></ActionButton>
      <ActionButton onPress={onEdit} variant="success" name="pencil-outline" />
    </View>
  );
};

export default TaskCard;
