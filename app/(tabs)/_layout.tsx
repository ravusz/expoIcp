import { Tabs } from "expo-router";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";

export default function TabLayout() {
  const { t } = useTranslation();

  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen
        name="dashboard"
        options={{
          headerShown: false,
          title: t("routing.DASHBOARD"),
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
          title: t("routing.PROJECTS"),
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
          title: t("routing.SETTINGS"),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cogs" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
