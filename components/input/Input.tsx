import React, { forwardRef } from "react";
import { TextInput, StyleSheet } from "react-native";
import type { TextInputProps } from "react-native";
import { theme } from "@/theme";

export type InputProps = TextInputProps;

const Input = forwardRef<TextInput, InputProps>((props: InputProps, ref) => {
  return <TextInput {...props} style={styles.input} ref={ref} />;
});

Input.displayName = "Input";

export default Input;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: theme.colors.yellow,
    fontSize: 16,
    color: "#333",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    width: "100%",
  },
});
