import React from "react";
import IconButton from "@/components/iconButton";
import { useBottomSheet } from "@gorhom/bottom-sheet";
import { Alert } from "react-native";
import { useTranslation } from "react-i18next";
import { useDeleteTask } from "../../../../api/mutations/useDeleteTask";

type Props = {
  projectId: string;
  taskId: string;
};

const DeleteActionButton = ({ projectId, taskId }: Props) => {
  const { t } = useTranslation();

  const { isPending, mutate } = useDeleteTask(projectId);
  const { close } = useBottomSheet();

  const onDelete = () => {
    Alert.alert(
      t("task.deleteConfirmation.TITLE"),
      t("task.deleteConfirmation.DESCRIPTION"),
      [
        {
          text: t("task.deleteConfirmation.CANCEL_BUTTON"),
          style: "cancel",
        },
        {
          text: t("task.deleteConfirmation.SUBMIT_BUTTON"),
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
    <IconButton
      onPress={onDelete}
      variant="danger"
      name="delete-outline"
      isLoading={isPending}
    />
  );
};

export default DeleteActionButton;
