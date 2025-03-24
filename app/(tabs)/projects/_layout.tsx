import { Stack } from "expo-router";
import { translate } from "@/i18n";

export default function ProjectsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: translate("routing.PROJECTS") }}
      />
      <Stack.Screen
        name="addProject/index"
        options={{
          title: translate("routing.ADD_PROJECT"),
        }}
      />
      <Stack.Screen
        name="[projectId]/editProject/index"
        options={{
          title: translate("routing.EDIT_PROJECT"),
        }}
      />
      <Stack.Screen
        name="[projectId]/tasks"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
