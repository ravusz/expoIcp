import { useState } from "react";
import { translate } from "@/i18n";
import { TASK_STATUSES } from "../../constants";
import DraggableFlatList from "react-native-draggable-flatlist";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import PagerView from "react-native-pager-view";
import type { TaskResponse } from "../../api/api";
import AddTaskButton from "../addTaskButton";
import TaskCard from "./taskCard";

type Props = {
  data: TaskResponse[];
};

const TasksCarousel = ({ data }: Props) => {
  const [items, setItems] = useState(data);

  return (
    <View style={styles.container}>
      <PagerView style={styles.pagerView} initialPage={0} pageMargin={20}>
        {Object.values(TASK_STATUSES).map((status) => (
          <View key={status} style={styles.page}>
            <Text style={styles.statusTitle}>
              {translate(`taskStatuses.${status}`)}
            </Text>
            <DraggableFlatList
              data={items.filter((task) => task.status === status)}
              onDragEnd={({ data }) => setItems(data)}
              keyExtractor={(item) => item.id}
              renderItem={({ item, drag, isActive }) => (
                <TaskCard task={item} drag={drag} isActive={isActive} />
              )}
            />
            {status === TASK_STATUSES.TO_DO && <AddTaskButton />}
          </View>
        ))}
      </PagerView>
    </View>
  );
};

export default TasksCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pagerView: {
    flex: 1,
  },
  page: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
});
