import ProjectForm from "../components/projectForm/ProjectForm";
import ScreenContainer from "@/components/screenContainer";
import { useCreateNewProject } from "@/app/(tabs)/api/mutations/useCreateNewProject";
import type { NewProject } from "@/app/(tabs)/api/api";
import { useRouter } from "expo-router";
import { translate } from "@/i18n";

const AddProjectsScreen = () => {
  const router = useRouter();

  const { mutate, isPending } = useCreateNewProject();

  const onSubmit = (data: NewProject) => {
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
        submitText={translate(`project.projectForm.ADD_SUBMIT_BUTTON_LABEL`)}
      />
    </ScreenContainer>
  );
};

export default AddProjectsScreen;
