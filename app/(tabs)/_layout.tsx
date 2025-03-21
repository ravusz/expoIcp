import { Tabs } from "expo-router";
import React from "react";
import { Text } from "react-native";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Text>Home</Text>,
        }}
      />
      <Tabs.Screen
        name="projects"
        options={{
          headerShown: false,
          title: "Projects",
          tabBarIcon: ({ color }) => <Text>Projects</Text>,
        }}
      />
    </Tabs>
  );
}
