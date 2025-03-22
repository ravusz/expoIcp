import ProjectForm from "../components/projectForm/ProjectForm";
import ScreenContainer from "@/components/screenContainer";
import { useEditProject } from "@/app/(tabs)/api/mutations/useEditProject";
import { useFetchProjectById } from "@/app/(tabs)/api/queries/useFetchProjectById";
import { useLocalSearchParams } from "expo-router";
import type { NewProject } from "@/app/(tabs)/api/api";
import { useRouter } from "expo-router";

const EditProjectsScreen = () => {
  const router = useRouter();
  const { projectId }: { projectId: string } = useLocalSearchParams();

  const { data, isLoading } = useFetchProjectById({ projectId });

  const { mutate, isPending } = useEditProject();

  const onSubmit = (data: NewProject) => {
    mutate(
      { projectId, data },
      {
        onSuccess: () => {
          router.back();
        },
      },
    );
  };

  return (
    <ScreenContainer>
      <ProjectForm
        defaultValues={data}
        isLoading={isPending}
        onSubmit={onSubmit}
      />
    </ScreenContainer>
  );
};

export default EditProjectsScreen;
