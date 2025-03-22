import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { translate } from "@/i18n";
import { editTask } from "../api";
import { taskKeys } from "../queryKeys";
import type { Task } from "../api";

export const useEditTask = () => {
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
    onSuccess: async () => {
      Toast.show({
        type: "success",
        text1: translate("task.editTaskSuccessMessage"),
      });

      await queryClient.invalidateQueries({
        queryKey: [taskKeys.all],
      });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: translate("task.editTaskErrorMessage"),
      });
    },
  });
};
