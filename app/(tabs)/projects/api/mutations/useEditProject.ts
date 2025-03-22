import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { translate } from "@/i18n";
import { editProject } from "../api";
import { projectKeys } from "../queryKeys";
import type { NewProject } from "../api";

export const useEditProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      data,
    }: {
      projectId: string;
      data: NewProject;
    }) => editProject(projectId, data),
    onSuccess: async () => {
      Toast.show({
        type: "success",
        text1: translate("project.editProjectSuccessMessage"),
      });

      await queryClient.invalidateQueries({
        queryKey: [projectKeys.all],
      });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: translate("project.editProjectErrorMessage"),
      });
    },
  });
};
