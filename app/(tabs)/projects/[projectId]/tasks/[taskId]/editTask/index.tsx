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
import { translate } from "@/i18n";

const EditTaskScreen = () => {
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
                  {translate("errorScreen.REFRESH")}
                </Button>
              }
            />
          ),
          data: (
            <TaskForm
              defaultValues={data}
              isLoading={isPending}
              onSubmit={onSubmit}
              submitText={translate(`task.taskForm.EDIT_SUBMIT_BUTTON_LABEL`)}
            />
          ),
        }[state]
      }
    </ScreenContainer>
  );
};

export default EditTaskScreen;
