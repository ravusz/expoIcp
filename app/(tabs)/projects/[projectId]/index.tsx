import ProjectForm from "../components/projectForm/ProjectForm";
import ScreenContainer from "@/components/screenContainer";
import { useEditProject } from "@/app/(tabs)/projects/api/mutations/useEditProject";
import { useFetchProjectById } from "@/app/(tabs)/projects/api/queries/useFetchProjectById";
import { useLocalSearchParams } from "expo-router";
import type { NewProject } from "@/app/(tabs)/projects/api/api";
import { useRouter } from "expo-router";
import ScreenLoader from "@/components/screenLoader";
import ErrorScreen from "@/components/errorScreen";
import Button from "@/components/button";
import { translate } from "@/i18n";

const EditProjectsScreen = () => {
  const router = useRouter();
  const { projectId }: { projectId: string } = useLocalSearchParams();

  const { data, isLoading, isError, refetch } = useFetchProjectById({
    projectId,
  });

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

  const getState = () => {
    if (isLoading) return "loading";
    if (isError) return "error";

    return "data";
  };

  const state = getState();

  return (
    <ScreenContainer>
      {
        {
          loading: <ScreenLoader />,
          error: (
            <ErrorScreen
              button={
                <Button onPress={() => refetch()}>
                  {translate("errorScreen.REFRESH")}
                </Button>
              }
            />
          ),
          data: (
            <ProjectForm
              defaultValues={data}
              isLoading={isPending}
              onSubmit={onSubmit}
              submitText={translate(
                `project.projectForm.EDIT_SUBMIT_BUTTON_LABEL`,
              )}
            />
          ),
        }[state]
      }
    </ScreenContainer>
  );
};

export default EditProjectsScreen;
