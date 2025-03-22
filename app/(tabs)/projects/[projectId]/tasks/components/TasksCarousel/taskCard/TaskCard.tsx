import React from "react";
import { useDeleteTask } from "../../../api/mutations/useDeleteTask";
import type { TaskResponse } from "../../../api/api";
import ActionButton from "@/components/actionButton";
import { TouchableOpacity, Alert, StyleSheet, Text, View } from "react-native";
import { translate } from "@/i18n";
import { useRouter } from "expo-router";

type Props = {
  task: TaskResponse;
  drag: any;
  isActive: any;
};

const TaskCard = ({ task, drag, isActive }: Props) => {
  const { isPending, mutate } = useDeleteTask();
  const router = useRouter();

  const onDelete = () => {
    Alert.alert(
      translate("task.deleteConfirmation.TITLE"),
      translate("task.deleteConfirmation.DESCRIPTION"),
      [
        {
          text: translate("task.deleteConfirmation.CANCEL_BUTTON"),
          style: "cancel",
        },
        {
          text: translate("task.deleteConfirmation.SUBMIT_BUTTON"),
          onPress: () => mutate({ projectId: task.projectId, taskId: task.id }),
        },
      ],
      { cancelable: true },
    );
  };

  const onEdit = () => {
    router.navigate(`projects/${task.projectId}/tasks/${task.id}/editTask`);
  };

  return (
    <TouchableOpacity
      onLongPress={drag}
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

      <View style={styles.buttonContainer}>
        <ActionButton
          onPress={onEdit}
          variant="success"
          name="pencil-outline"
        />
        <ActionButton
          onPress={onDelete}
          variant="error"
          name="delete-outline"
          isLoading={isPending}
        />
      </View>
    </TouchableOpacity>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  taskCard: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row", // Ustawienie tekstu i przycisków obok siebie
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
    flex: 1, // Pozwala tekstowi zająć całą dostępną przestrzeń
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
  buttonContainer: {
    flexDirection: "column", // Ustawienie przycisków jeden pod drugim
    alignItems: "center",
    gap: 8, // Odstęp między przyciskami
  },
});
