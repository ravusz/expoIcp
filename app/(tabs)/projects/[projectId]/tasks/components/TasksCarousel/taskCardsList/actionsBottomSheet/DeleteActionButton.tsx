import React from "react";
import ActionButton from "@/components/actionButton";
import { useBottomSheet } from "@gorhom/bottom-sheet";
import { Alert } from "react-native";
import { translate } from "@/i18n";
import { useDeleteTask } from "../../../../api/mutations/useDeleteTask";

type Props = {
  projectId: string;
  taskId: string;
};

const DeleteActionButton = ({ projectId, taskId }: Props) => {
  const { isPending, mutate } = useDeleteTask(projectId);
  const { close } = useBottomSheet();

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
          onPress: () =>
            mutate(taskId, {
              onSettled: () => {
                close();
              },
            }),
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <ActionButton
      onPress={onDelete}
      variant="error"
      name="delete-outline"
      isLoading={isPending}
    />
  );
};

export default DeleteActionButton;
