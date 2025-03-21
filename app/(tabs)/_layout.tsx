import { Tabs } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { translate } from "@/i18n";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: translate("routing.DASHBOARD"),
          tabBarIcon: ({ color }) => <Text>Home</Text>,
        }}
      />
      <Tabs.Screen
        name="projects"
        options={{
          headerShown: false,
          title: translate("routing.PROJECTS"),
          tabBarIcon: ({ color }) => <Text>Projects</Text>,
        }}
      />
    </Tabs>
  );
}
