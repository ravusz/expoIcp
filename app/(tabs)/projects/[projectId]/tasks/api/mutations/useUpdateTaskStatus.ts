import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import { updateTaskStatus } from "../api";
import { taskKeys } from "../queryKeys";
import type { TaskStatus } from "../api";

export const useUpdateTaskStatus = (projectId: string) => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, status }: { taskId: string; status: TaskStatus }) =>
      updateTaskStatus(taskId, status),
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: t("task.editTaskStatusSuccessMessage"),
      });

      queryClient.invalidateQueries({
        queryKey: [taskKeys.byProject(projectId)],
      });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: t("task.editTaskStatusErrorMessage"),
      });
    },
  });
};
