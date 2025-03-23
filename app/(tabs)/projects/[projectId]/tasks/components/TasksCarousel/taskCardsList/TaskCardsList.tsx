import React, { useRef, useState, useEffect } from "react";
import type { TaskResponse, TaskStatus } from "../../../api/api";
import { StyleSheet, Text, View } from "react-native";
import { translate } from "@/i18n";
import DraggableFlatList from "react-native-draggable-flatlist";
import ActionsBottomSheet from "./actionsBottomSheet";
import TaskCard from "./taskCard";
import BottomSheet from "@gorhom/bottom-sheet";
import { TASK_STATUSES } from "../../../constants";
import AddTaskButton from "../../addTaskButton";
import { theme } from "@/theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type Props = {
  data: TaskResponse[];
  status: TaskStatus;
};

const TaskCardsList = ({ data, status }: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const currentTasks = data.filter((task) => task.status === status);
  const [items, setItems] = useState<TaskResponse[]>(currentTasks);
  const [selectedTask, setTask] = useState<TaskResponse>(data[0]);

  const onSelectTask = (task: TaskResponse) => {
    setTask(task);
    bottomSheetRef.current?.expand();
  };

  useEffect(() => {
    setItems(data.filter((task) => task.status === status));
  }, [data, status]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.statusTitle}>
          {translate(`taskStatuses.${status}`)}
        </Text>
        <MaterialCommunityIcons
          name="dots-horizontal"
          size={24}
          color={theme.colors.base}
        />
      </View>

      <View style={styles.listContainer}>
        <DraggableFlatList
          data={items}
          onDragEnd={({ data }) => setItems(data)}
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
