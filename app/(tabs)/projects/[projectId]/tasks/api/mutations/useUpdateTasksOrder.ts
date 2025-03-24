import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import { updateTasksOrder } from "../api";
import { taskKeys } from "../queryKeys";
import type { TaskStatus } from "../api";

export const useUpdateTasksOrder = (projectId: string) => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ids, status }: { ids: string[]; status: TaskStatus }) =>
      updateTasksOrder(ids, status),
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: t("task.updateTaskOrderSuccessMessage"),
      });

      queryClient.invalidateQueries({
        queryKey: [taskKeys.byProject(projectId)],
      });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: t("task.updateTaskOrderErrorMessage"),
      });
    },
  });
};
