import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import { editProject } from "../api";
import { projectKeys } from "../queryKeys";
import type { Project } from "../api";

export const useEditProject = () => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, data }: { projectId: string; data: Project }) =>
      editProject(projectId, data),
    onSuccess: async () => {
      Toast.show({
        type: "success",
        text1: t("project.editProjectSuccessMessage"),
      });

      await queryClient.invalidateQueries({
        queryKey: [projectKeys.all],
      });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: t("project.editProjectErrorMessage"),
      });
    },
  });
};
