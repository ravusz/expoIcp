import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { translate } from "@/i18n";
import { updateTasksOrder } from "../api";
import { taskKeys } from "../queryKeys";
import type { TaskStatus } from "../api";

export const useUpdateTasksOrder = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ids, status }: { ids: string[]; status: TaskStatus }) =>
      updateTasksOrder(ids, status),
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
