import React from "react";
import { Text, StyleSheet } from "react-native";

type Props = {
  children: React.ReactNode;
};

const Label = ({ children }: Props) => {
  return <Text style={styles.label}>{children}</Text>;
};

export default Label;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    marginTop: 12,
  },
});
