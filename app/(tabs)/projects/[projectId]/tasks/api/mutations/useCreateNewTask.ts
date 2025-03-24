import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import { createNewTask } from "../api";
import { taskKeys } from "../queryKeys";
import type { Task } from "../api";

export const useCreateNewTask = (projectId: string) => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Task) => createNewTask(projectId, data),
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: t("task.addTaskSuccessMessage"),
      });

      queryClient.invalidateQueries({
        queryKey: taskKeys.byProject(projectId),
      });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: t("task.addTaskErrorMessage"),
      });
    },
  });
};
