import { TASK_STATUSES } from "../../constants";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";
import type { TaskResponse } from "../../api/api";

import TaskCardsList from "./taskCardsList";
import Dots from "./dots";

type Props = {
  data: TaskResponse[];
};

const TasksCarousel = ({ data }: Props) => {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <View style={styles.container}>
      <Dots currentPage={currentPage} />
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        pageMargin={20}
        onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
      >
        {Object.values(TASK_STATUSES).map((status) => {
          return (
            <TaskCardsList
              key={status}
              data={data.filter((task) => task.status === status)}
              status={status}
            />
          );
        })}
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
