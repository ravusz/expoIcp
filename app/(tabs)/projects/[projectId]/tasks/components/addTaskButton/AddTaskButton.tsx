import React from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { theme } from "@/theme"; // Upewnij się, że masz dostęp do `theme`

const AddTaskButton = () => {
  const { projectId }: { projectId: string } = useLocalSearchParams();

  return (
    <Link href={`projects/${projectId}/tasks/addTask`} asChild>
      <Pressable style={styles.button}>
        <FontAwesome6 name="plus" size={20} color={theme.colors.base} />
        <Text style={styles.text}>Dodaj Zadanie</Text>
      </Pressable>
    </Link>
  );
};

export default AddTaskButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: theme.colors.yellow,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    gap: 8,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.base,
    textAlign: "center",
  },
});
