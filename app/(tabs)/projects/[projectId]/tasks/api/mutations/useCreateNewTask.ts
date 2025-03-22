import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { translate } from "@/i18n";
import { createNewTask } from "../api";
import { taskKeys } from "../queryKeys";
import type { Task } from "../api";

export const useCreateNewTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, data }: { projectId: string; data: Task }) =>
      createNewTask(projectId, data),
    onSuccess: async () => {
      Toast.show({
        type: "success",
        text1: translate("task.addTaskSuccessMessage"),
      });

      await queryClient.invalidateQueries({
        queryKey: [taskKeys.all],
      });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: translate("task.addTaskErrorMessage"),
      });
    },
  });
};
