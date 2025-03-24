import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import { editTask } from "../api";
import { taskKeys } from "../queryKeys";
import type { Task } from "../api";

export const useEditTask = () => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      taskId,
      data,
    }: {
      projectId: string;
      taskId: string;
      data: Task;
    }) => editTask(projectId, taskId, data),
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: t("task.editTaskSuccessMessage"),
      });

      queryClient.invalidateQueries({
        queryKey: [taskKeys.all],
      });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: t("task.editTaskErrorMessage"),
      });
    },
  });
};
