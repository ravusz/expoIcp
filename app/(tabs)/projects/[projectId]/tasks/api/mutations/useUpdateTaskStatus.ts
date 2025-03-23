import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { translate } from "@/i18n";
import { updateTaskStatus } from "../api";
import { taskKeys } from "../queryKeys";
import type { TaskStatus } from "../api";

export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      taskId,
      status,
    }: {
      projectId: string;
      taskId: string;
      status: TaskStatus;
    }) => updateTaskStatus(projectId, taskId, status),
    onSuccess: async () => {
      Toast.show({
        type: "success",
        text1: translate("task.editTaskStatusSuccessMessage"),
      });

      await queryClient.invalidateQueries({
        queryKey: [taskKeys.all],
      });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: translate("task.editTaskStatusErrorMessage"),
      });
    },
  });
};
