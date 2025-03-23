import React from "react";
import type { TaskResponse } from "../../../../api/api";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";

type Props = {
  task: TaskResponse;
  drag: any;
  isActive: any;
  onPress: () => void;
};

const TaskCard = ({ task, drag, isActive, onPress }: Props) => {
  return (
    <TouchableOpacity
      onLongPress={drag}
      onPress={onPress}
      disabled={isActive}
      style={[styles.taskCard, isActive && styles.activeTaskCard]}
    >
      <View style={styles.textContainer}>
        <Text style={styles.taskName} numberOfLines={1} ellipsizeMode="tail">
          {task.name}
        </Text>
        <Text
          style={styles.taskDescription}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {task.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  taskCard: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activeTaskCard: {
    backgroundColor: "#E3F2FD",
    transform: [{ scale: 1.03 }],
  },
  textContainer: {
    flex: 1,
  },
  taskName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  taskDescription: {
    fontSize: 14,
    color: "#666",
  },
});
