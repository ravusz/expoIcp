import React, { useRef, useState, useEffect } from "react";
import type { TaskResponse } from "../../../api/api";
import { StyleSheet, Text, View } from "react-native";
import { translate } from "@/i18n";
import DraggableFlatList from "react-native-draggable-flatlist";
import ActionsBottomSheet from "./actionsBottomSheet";
import TaskCard from "./taskCard";
import BottomSheet from "@gorhom/bottom-sheet";
import { TASK_STATUSES } from "../../../constants";
import AddTaskButton from "../../addTaskButton";

type Props = {
  data: TaskResponse[];
  status: keyof typeof TASK_STATUSES;
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
    <View style={styles.page}>
      <Text style={styles.statusTitle}>
        {translate(`taskStatuses.${status}`)}
      </Text>
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
      {selectedTask && (
        <ActionsBottomSheet
          ref={bottomSheetRef}
          projectId={selectedTask.projectId}
          taskId={selectedTask.id}
          status={status}
        />
      )}

      {status === TASK_STATUSES.TO_DO && <AddTaskButton />}
    </View>
  );
};

export default TaskCardsList;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 16,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
});
