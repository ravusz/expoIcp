import TaskForm from "../components/taskForm";
import ScreenContainer from "@/components/screenContainer";
import { useCreateNewTask } from "../api/mutations/useCreateNewTask";
import type { Task } from "../api/api";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useLocalSearchParams } from "expo-router";

const AddTaskScreen = () => {
  const { t } = useTranslation();

  const { projectId }: { projectId: string } = useLocalSearchParams();
  const router = useRouter();

  const { mutate, isPending } = useCreateNewTask(projectId);

  const onSubmit = (data: Task) => {
    mutate(data, {
      onSuccess: () => {
        router.back();
      },
    });
  };

  return (
    <ScreenContainer>
      <TaskForm
        onSubmit={onSubmit}
        isLoading={isPending}
        submitText={t(`task.taskForm.ADD_SUBMIT_BUTTON_LABEL`)}
      />
    </ScreenContainer>
  );
};

export default AddTaskScreen;
