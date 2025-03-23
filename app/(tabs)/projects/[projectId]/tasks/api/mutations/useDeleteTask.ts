import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { translate } from "@/i18n";
import { deleteTask } from "../api";
import { taskKeys } from "../queryKeys";

export const useDeleteTask = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: string) => deleteTask(projectId, taskId),
    onSuccess: async () => {
      Toast.show({
        type: "success",
        text1: translate("task.deleteTaskSuccessMessage"),
      });

      await queryClient.invalidateQueries({
        queryKey: [taskKeys.byProject(projectId)],
      });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: translate("task.deleteTaskErrorMessage"),
      });
    },
  });
};
