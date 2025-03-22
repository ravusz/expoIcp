import { Stack } from "expo-router";
import { translate } from "@/i18n";

export default function ProjectsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Projects" }} />
      <Stack.Screen
        name="addProject/index"
        options={{
          title: translate("routing.ADD_PROJECT"),
        }}
      />
      <Stack.Screen
        name="[projectId]/index"
        options={{
          title: translate("routing.EDIT_PROJECT"),
        }}
      />
      <Stack.Screen
        name="tasks"
        options={{
          title: translate("routing.TASKS"),
          headerShown: false,
        }}
      />
    </Stack>
  );
}
