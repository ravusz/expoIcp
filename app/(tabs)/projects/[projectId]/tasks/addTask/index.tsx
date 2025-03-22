import TaskForm from "../components/taskForm";
import ScreenContainer from "@/components/screenContainer";
import { useCreateNewTask } from "../api/mutations/useCreateNewTask";
import type { Task } from "../api/api";
import { useRouter } from "expo-router";
import { translate } from "@/i18n";
import { useLocalSearchParams } from "expo-router";

const AddTaskScreen = () => {
  const { projectId }: { projectId: string } = useLocalSearchParams();
  const router = useRouter();

  const { mutate, isPending } = useCreateNewTask();

  const onSubmit = (data: Task) => {
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
      <TaskForm
        onSubmit={onSubmit}
        isLoading={isPending}
        submitText={translate(`task.taskForm.ADD_SUBMIT_BUTTON_LABEL`)}
      />
    </ScreenContainer>
  );
};

export default AddTaskScreen;
