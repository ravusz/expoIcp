import TaskCard from "../taskCard";

import Button from "@/components/button";
import { translate } from "@/i18n";
import { TASK_STATUSES } from "../../constants";

import React from "react";
import { StyleSheet, View, Text } from "react-native";
import PagerView from "react-native-pager-view";
import type { TaskResponse } from "../../api/api";

type Props = {
  data: TaskResponse[];
};

const TasksCarousel = ({ data }: Props) => {
  return (
    <View style={styles.container}>
      <PagerView style={styles.container} initialPage={0}>
        {Object.values(TASK_STATUSES).map((status) => {
          return (
            <View style={styles.page} key={status}>
              <Text>{translate(`taskStatuses.${status}`)}</Text>
              <Text>Swipe ➡️</Text>
              {data?.map((item) => {
                return <TaskCard key={item.id} {...item} />;
              })}
            </View>
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
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
});
