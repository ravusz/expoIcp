import { TASK_STATUSES } from "@/constants";
import React from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  currentPage: number;
};

const Dots = ({ currentPage }: Props) => {
  return (
    <View style={styles.dotsContainer}>
      {Object.values(TASK_STATUSES).map((_, index) => {
        return (
          <View
            key={index}
            style={[
              styles.dot,
              currentPage === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        );
      })}
    </View>
  );
};

export default Dots;

const styles = StyleSheet.create({
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: "#ddd",
  },
  activeDot: {
    backgroundColor: "#4CAF50",
  },
  inactiveDot: {
    backgroundColor: "#ccc",
  },
});
