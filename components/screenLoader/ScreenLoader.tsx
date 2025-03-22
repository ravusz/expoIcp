import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const ScreenLoader = () => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default ScreenLoader;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
