import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { translate } from "@/i18n";
import { createNewProject } from "../api";
import { projectKeys } from "../queryKeys";

export const useCreateNewProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNewProject,
    onSuccess: async () => {
      Toast.show({
        type: "success",
        text1: translate("project.addProjectSuccessMessage"),
      });

      await queryClient.invalidateQueries({
        queryKey: [projectKeys.all],
      });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: translate("project.addProjectErrorMessage"),
      });
    },
  });
};
