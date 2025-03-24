import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import { createNewProject } from "../api";
import { projectKeys } from "../queryKeys";

export const useCreateNewProject = () => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNewProject,
    onSuccess: async () => {
      Toast.show({
        type: "success",
        text1: t("project.addProjectSuccessMessage"),
      });

      await queryClient.invalidateQueries({
        queryKey: [projectKeys.all],
      });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: t("project.addProjectErrorMessage"),
      });
    },
  });
};
