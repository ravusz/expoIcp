import { Stack } from "expo-router";

export default function TasksLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Tasks" }} />
      <Stack.Screen name="addTask/index" options={{ title: "Add task" }} />
      <Stack.Screen name="editTask/index" options={{ title: "Edit task" }} />
    </Stack>
  );
}
