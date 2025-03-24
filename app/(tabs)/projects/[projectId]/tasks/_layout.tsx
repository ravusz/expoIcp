import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

export default function TasksLayout() {
  const { t } = useTranslation();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: t("routing.TASKS"),
        }}
      />
      <Stack.Screen
        name="addTask/index"
        options={{
          title: t("routing.ADD_TASK"),
        }}
      />
      <Stack.Screen
        name="[taskId]/editTask/index"
        options={{
          title: t("routing.EDIT_TASK"),
        }}
      />
    </Stack>
  );
}
