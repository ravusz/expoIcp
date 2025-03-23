import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { theme } from "@/theme";

const ScreenLoader = () => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color={theme.colors.info} />
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
