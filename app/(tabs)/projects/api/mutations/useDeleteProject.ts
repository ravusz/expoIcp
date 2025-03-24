import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import { deleteProject } from "../api";
import { projectKeys } from "../queryKeys";

export const useDeleteProject = () => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: t("project.deleteProjectSuccessMessage"),
      });

      queryClient.invalidateQueries({
        queryKey: projectKeys.all,
      });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: t("project.deleteProjectErrorMessage"),
      });
    },
  });
};
