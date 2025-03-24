import React, { useRef, useState } from "react";
import type { TaskResponse, TaskStatus } from "../../../api/api";
import { StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import DraggableFlatList from "react-native-draggable-flatlist";
import ActionsBottomSheet from "./actionsBottomSheet";
import TaskCard from "./taskCard";
import BottomSheet from "@gorhom/bottom-sheet";
import { TASK_STATUSES } from "@/constants";
import AddTaskButton from "../../addTaskButton";
import { theme } from "@/theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useUpdateTasksOrder } from "@/tasksApi/mutations/useUpdateTasksOrder";
import { useLocalSearchParams } from "expo-router";
import TaskListEmptyState from "./taskListEmptyState";

type Props = {
  data: TaskResponse[];
  status: TaskStatus;
};

const TaskCardsList = ({ data, status }: Props) => {
  const { t } = useTranslation();

  const { projectId }: { projectId: string } = useLocalSearchParams();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const { mutate } = useUpdateTasksOrder(projectId);

  const currentTasks = data
    .filter((task) => task.status === status)
    .sort((a, b) => a.order - b.order);

  const [selectedTask, setTask] = useState<TaskResponse>(data[0]);

  const onSelectTask = (task: TaskResponse) => {
    setTask(task);
    bottomSheetRef.current?.expand();
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.statusTitle}>{t(`taskStatuses.${status}`)}</Text>
        <MaterialCommunityIcons
          name="dots-horizontal"
          size={24}
          color={theme.colors.base}
        />
      </View>

      <View style={styles.listContainer}>
        <DraggableFlatList
          ListEmptyComponent={<TaskListEmptyState />}
          data={currentTasks}
          onDragEnd={({ data }) => {
            mutate({ ids: data.map(({ id }) => id), status });
          }}
          keyExtractor={(item) => item.id}
          renderItem={({ item, drag, isActive }) => (
            <TaskCard
              task={item}
              drag={drag}
              isActive={isActive}
              onPress={() => onSelectTask(item)}
            />
          )}
        />
      </View>
      {status === TASK_STATUSES.TO_DO && <AddTaskButton />}
      {selectedTask && (
        <ActionsBottomSheet
          ref={bottomSheetRef}
          projectId={selectedTask.projectId}
          taskId={selectedTask.id}
          status={status}
        />
      )}
    </View>
  );
};

export default TaskCardsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.padding.lg,
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.margin.md,
  },
  statusTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: "600",
    color: theme.colors.base,
    textAlign: "center",
  },
  listContainer: {
    flex: 1,
  },
});
