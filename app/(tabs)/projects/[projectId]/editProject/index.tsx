import ProjectForm from "../../components/projectForm/ProjectForm";
import ScreenContainer from "@/components/screenContainer";
import { useEditProject } from "@/app/(tabs)/projects/api/mutations/useEditProject";
import { useFetchProjectById } from "@/app/(tabs)/projects/api/queries/useFetchProjectById";
import { useLocalSearchParams } from "expo-router";
import type { Project } from "@/app/(tabs)/projects/api/api";
import { useRouter } from "expo-router";
import ScreenLoader from "@/components/screenLoader";
import ErrorScreen from "@/components/errorScreen";
import Button from "@/components/button";
import { useTranslation } from "react-i18next";

const EditProjectsScreen = () => {
  const { t } = useTranslation();

  const router = useRouter();
  const { projectId }: { projectId: string } = useLocalSearchParams();

  const { data, isLoading, isError, refetch } = useFetchProjectById(projectId);

  const { mutate, isPending } = useEditProject();

  const onSubmit = (data: Project) => {
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
                  {t("errorScreen.REFRESH")}
                </Button>
              }
            />
          ),
          data: (
            <ProjectForm
              defaultValues={data}
              isLoading={isPending}
              onSubmit={onSubmit}
              submitText={t(`project.projectForm.EDIT_SUBMIT_BUTTON_LABEL`)}
            />
          ),
        }[state]
      }
    </ScreenContainer>
  );
};

export default EditProjectsScreen;
