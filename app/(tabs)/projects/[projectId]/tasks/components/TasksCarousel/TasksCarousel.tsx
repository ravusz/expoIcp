import { TASK_STATUSES } from "../../constants";
import React from "react";
import { StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";
import type { TaskResponse } from "../../api/api";

import TaskCardsList from "./taskCardsList";

type Props = {
  data: TaskResponse[];
};

const TasksCarousel = ({ data }: Props) => {
  return (
    <View style={styles.container}>
      <PagerView style={styles.pagerView} initialPage={0} pageMargin={20} on>
        {Object.values(TASK_STATUSES).map((status) => (
          <TaskCardsList
            key={status}
            data={data.filter((task) => task.status === status)}
            status={status}
          />
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
});
