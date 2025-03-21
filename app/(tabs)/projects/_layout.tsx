import { Stack } from "expo-router";

export default function ProjectsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Projects" }} />
      <Stack.Screen
        name="addProject/index"
        options={{ title: "Add project" }}
      />
      <Stack.Screen
        name="editProject/index"
        options={{ title: "Edit project" }}
      />
      <Stack.Screen
        name="tasks"
        options={{ title: "Tasks", headerShown: false }}
      />
    </Stack>
  );
}
