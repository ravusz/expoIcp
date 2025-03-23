/* eslint-disable react-native/no-unused-styles */
import React from "react";
import { Pressable, Text, StyleSheet, ActivityIndicator } from "react-native";
import type { PressableProps } from "react-native";
import { theme } from "@/theme";

export type ButtonVariant = "primary" | "secondary" | "danger" | "info";

type Props = PressableProps & {
  children: React.ReactNode;
  variant?: ButtonVariant;
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
        <ActivityIndicator size={24} color={theme.colors.white} />
      ) : (
        <Text style={styles.text}>{children}</Text>
      )}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingVertical: theme.paddings.md,
    paddingHorizontal: theme.paddings.md,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderRadius: theme.borderRadius.md,
    minHeight: 50,
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
  },
  danger: {
    backgroundColor: theme.colors.danger,
  },
  info: {
    backgroundColor: theme.colors.info,
  },
  text: {
    fontSize: theme.fontSize.md,
    color: theme.colors.white,
    textAlign: "center",
    fontWeight: "500",
  },
});
