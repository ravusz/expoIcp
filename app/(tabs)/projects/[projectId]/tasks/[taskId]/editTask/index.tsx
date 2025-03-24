import TaskForm from "../../components/taskForm";
import ScreenContainer from "@/components/screenContainer";
import { useEditTask } from "../../api/mutations/useEditTask";
import { useFetchTaskById } from "../../api/queries/useFetchTaskById";
import { useLocalSearchParams } from "expo-router";
import type { Task } from "../../api/api";
import { useRouter } from "expo-router";
import ScreenLoader from "@/components/screenLoader";
import ErrorScreen from "@/components/errorScreen";
import Button from "@/components/button";
import { useTranslation } from "react-i18next";

const EditTaskScreen = () => {
  const { t } = useTranslation();

  const router = useRouter();
  const { projectId, taskId }: { projectId: string; taskId: string } =
    useLocalSearchParams();

  const { data, isLoading, isError, refetch } = useFetchTaskById(
    projectId,
    taskId,
  );

  const { mutate, isPending } = useEditTask();

  const onSubmit = (data: Task) => {
    mutate(
      { projectId, taskId, data },
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
            <TaskForm
              defaultValues={data}
              isLoading={isPending}
              onSubmit={onSubmit}
              submitText={t(`task.taskForm.EDIT_SUBMIT_BUTTON_LABEL`)}
            />
          ),
        }[state]
      }
    </ScreenContainer>
  );
};

export default EditTaskScreen;
