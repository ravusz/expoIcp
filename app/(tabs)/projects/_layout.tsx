import { Stack } from "expo-router";

export default function ProjectsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Projects" }} />
      <Stack.Screen
        name="addProject/index"
        options={{ title: "Add project" }}
      />
    </Stack>
  );
}
