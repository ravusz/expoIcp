import React from "react";
import { Text, StyleSheet } from "react-native";
import { theme } from "@/theme";

export type ValidationErrorMessageProps = {
  errorMessage?: string;
};

const ValidationErrorMessage = ({
  errorMessage,
}: ValidationErrorMessageProps) => {
  return errorMessage ? (
    <Text style={styles.errorMessage}>{errorMessage}</Text>
  ) : null;
};

export default ValidationErrorMessage;

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: theme.fontSize.xs,
    fontWeight: "bold",
    color: theme.colors.danger,
    marginTop: theme.margin.xs,
    marginBottom: theme.margin.sm,
  },
});
