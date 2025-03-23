import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { translate } from "@/i18n";
import { updateTaskStatus } from "../api";
import { taskKeys } from "../queryKeys";
import type { TaskStatus } from "../api";

export const useUpdateTaskStatus = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, status }: { taskId: string; status: TaskStatus }) =>
      updateTaskStatus(taskId, status),
    onSuccess: async () => {
      Toast.show({
        type: "success",
        text1: translate("task.editTaskStatusSuccessMessage"),
      });

      await queryClient.invalidateQueries({
        queryKey: [taskKeys.byProject(projectId)],
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
