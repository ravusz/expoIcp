import React from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "@/theme";

type Props = {
  children: React.ReactNode;
};

const ScreenContainer = ({ children }: Props) => {
  return <View style={styles.container}>{children}</View>;
};

export default ScreenContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.padding.lg,
    backgroundColor: theme.colors.lightGray,
  },
});
