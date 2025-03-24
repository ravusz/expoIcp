import { Tabs } from "expo-router";
import React from "react";
import { translate } from "@/i18n";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen
        name="dashboard"
        options={{
          headerShown: false,
          title: translate("routing.DASHBOARD"),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="view-dashboard-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="projects"
        options={{
          headerShown: false,
          title: translate("routing.PROJECTS"),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="folder-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          title: translate("routing.SETTINGS"),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cogs" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
