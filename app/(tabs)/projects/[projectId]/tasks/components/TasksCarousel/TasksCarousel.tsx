import TaskCard from "../taskCard";

import Button from "@/components/button";
import { translate } from "@/i18n";

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
        <View style={styles.page} key="1">
          <Text>First page</Text>
          <Text>Swipe ➡️</Text>
          {data?.map((item) => {
            return <TaskCard key={item.id} {...item} />;
          })}
        </View>
        <View style={styles.page} key="2">
          <Text>Second page</Text>
        </View>
        <View style={styles.page} key="3">
          <Text>Third page</Text>
        </View>
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
