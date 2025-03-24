import ProjectForm from "../components/projectForm/ProjectForm";
import ScreenContainer from "@/components/screenContainer";
import { useCreateNewProject } from "@/app/(tabs)/projects/api/mutations/useCreateNewProject";
import type { Project } from "@/app/(tabs)/projects/api/api";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

const AddProjectsScreen = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const { mutate, isPending } = useCreateNewProject();

  const onSubmit = (data: Project) => {
    mutate(data, {
      onSuccess: () => {
        router.back();
      },
    });
  };

  return (
    <ScreenContainer>
      <ProjectForm
        onSubmit={onSubmit}
        isLoading={isPending}
        submitText={t(`project.projectForm.ADD_SUBMIT_BUTTON_LABEL`)}
      />
    </ScreenContainer>
  );
};

export default AddProjectsScreen;
