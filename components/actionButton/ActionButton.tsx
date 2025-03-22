/* eslint-disable react-native/no-unused-styles */
import React, { ComponentProps } from "react";
import type { PressableProps } from "react-native";
import { StyleSheet, Pressable, ActivityIndicator } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type Variant = "success" | "error" | "ghost";

type Props = PressableProps & {
  variant?: Variant;
  isLoading?: boolean;
  name: ComponentProps<typeof MaterialCommunityIcons>["name"];
};

const ActionButton = ({
  isLoading,
  variant = "success",
  name,
  ...rest
}: Props) => {
  return (
    <Pressable style={[styles.actionButton, styles[variant]]} {...rest}>
      {isLoading ? (
        <ActivityIndicator size={24} color="#fff" />
      ) : (
        <MaterialCommunityIcons name={name} size={24} color="#fff" />
      )}
    </Pressable>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  actionButton: {
    padding: 12,
    borderRadius: 8,
    marginLeft: 8,
  },
  success: {
    backgroundColor: "#28a745",
  },
  error: {
    backgroundColor: "#dc3545",
  },
  ghost: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#6c757d",
  },
});
