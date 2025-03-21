import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { translate } from "@/i18n";
import { deleteProject } from "../api";
import { projectKeys } from "../queryKeys";

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId }: { projectId: string }) =>
      deleteProject(projectId),
    onSuccess: async () => {
      Toast.show({
        type: "success",
        text1: translate("project.deleteProjectSuccessMessage"),
      });

      await queryClient.invalidateQueries({
        queryKey: [projectKeys.all],
      });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: translate("project.deleteProjectErrorMessage"),
      });
    },
  });
};
