import { Stack } from "expo-router";
import { translate } from "@/i18n";

export default function TasksLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: translate("routing.TASKS"),
        }}
      />
      <Stack.Screen
        name="addTask/index"
        options={{
          title: translate("routing.ADD_TASK"),
        }}
      />
      <Stack.Screen
        name="[taskId]/editTask/index"
        options={{
          title: translate("routing.EDIT_TASK"),
        }}
      />
    </Stack>
  );
}
