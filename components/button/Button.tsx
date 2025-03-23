import React from "react";
import { Pressable, Text, StyleSheet, ActivityIndicator } from "react-native";
import type { PressableProps } from "react-native";
import { theme } from "@/theme";

type Variant = "primary" | "secondary" | "danger";

type Props = PressableProps & {
  children: React.ReactNode;
  variant?: Variant;
  isLoading?: boolean;
};

const Button = ({
  children,
  variant = "primary",
  isLoading,
  ...rest
}: Props) => {
  return (
    <Pressable style={[styles.button, styles[variant]]} {...rest}>
      {isLoading ? (
        <ActivityIndicator size={24} color="#fff" />
      ) : (
        <Text style={styles.text}>{children}</Text>
      )}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,

    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  primary: {
    backgroundColor: theme.colors.yellow,
  },
  secondary: {
    backgroundColor: theme.colors.gray,
  },
  danger: {
    backgroundColor: theme.colors.red,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.base,
    textAlign: "center",
  },
});
