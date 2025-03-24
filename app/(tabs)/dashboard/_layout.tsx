import { Stack } from "expo-router";
import { translate } from "@/i18n";

export default function DashboardLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: translate("routing.DASHBOARD") }}
      />
    </Stack>
  );
}
