import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

export default function ProjectsLayout() {
  const { t } = useTranslation();

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: t("routing.PROJECTS") }} />
      <Stack.Screen
        name="addProject/index"
        options={{
          title: t("routing.ADD_PROJECT"),
        }}
      />
      <Stack.Screen
        name="[projectId]/editProject/index"
        options={{
          title: t("routing.EDIT_PROJECT"),
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
