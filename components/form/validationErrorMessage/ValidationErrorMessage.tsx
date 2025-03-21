import React from "react";
import { Text, StyleSheet } from "react-native";

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
    fontSize: 12,
    fontWeight: "bold",
    color: "#FF4F4F",
    marginTop: 2,
    marginBottom: 10,
  },
});
