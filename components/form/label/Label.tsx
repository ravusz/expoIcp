import React from "react";
import { Text, StyleSheet } from "react-native";
import { theme } from "@/theme";

type Props = {
  children: React.ReactNode;
};

const Label = ({ children }: Props) => {
  return <Text style={styles.label}>{children}</Text>;
};

export default Label;

const styles = StyleSheet.create({
  label: {
    fontSize: theme.fontSize.sm,
    fontWeight: "600",
    color: theme.colors.base,
    marginBottom: theme.margin.sm,
    marginTop: theme.margin.md,
  },
});
