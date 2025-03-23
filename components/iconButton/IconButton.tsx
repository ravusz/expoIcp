/* eslint-disable react-native/no-unused-styles */
import React, { ComponentProps } from "react";
import type { PressableProps } from "react-native";
import { StyleSheet, Pressable, ActivityIndicator } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { theme } from "@/theme"; // Importowanie tematu
import type { ButtonVariant } from "@/components/button/Button"; // Importowanie tematu

type Props = PressableProps & {
  variant?: ButtonVariant;
  isLoading?: boolean;
  name: ComponentProps<typeof MaterialCommunityIcons>["name"];
};

const IconButton = ({
  isLoading,
  variant = "primary",
  name,
  ...rest
}: Props) => {
  return (
    <Pressable style={[styles.actionButton, styles[variant]]} {...rest}>
      {isLoading ? (
        <ActivityIndicator size={24} color={theme.colors.white} />
      ) : (
        <MaterialCommunityIcons
          name={name}
          size={24}
          color={theme.colors.white}
        />
      )}
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  actionButton: {
    padding: theme.paddings.sm,
    borderRadius: theme.borderRadius.md,
    marginLeft: theme.paddings.sm,
    alignItems: "center",
    justifyContent: "center",
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
});
