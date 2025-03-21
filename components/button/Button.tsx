import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import type { PressableProps } from "react-native";

import { theme } from "@/theme";

type Props = PressableProps & {
  children: React.ReactNode;
};

const Button = ({ children, ...rest }: Props) => {
  return (
    <Pressable style={styles.button} {...rest}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.yellow,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.base,
    textAlign: "center",
  },
});
