import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { translate } from "@/i18n";
import { theme } from "@/theme";

const TaskListEmptyState = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.emptyText}>{translate("task.EMPTY_TASKS_LIST")}</Text>
    </View>
  );
};

export default TaskListEmptyState;

const styles = StyleSheet.create({
  container: {
    padding: theme.padding.md,
  },
  emptyText: {
    fontSize: theme.fontSize.lg,
    fontWeight: "500",
    color: theme.colors.base,
    textAlign: "center",
    marginTop: theme.margin.md,
  },
});
