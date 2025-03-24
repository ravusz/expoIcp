import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { theme } from "@/theme";

const TaskListEmptyState = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.emptyText}>{t("task.EMPTY_TASKS_LIST")}</Text>
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
