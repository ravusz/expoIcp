import React, { forwardRef, useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import type { TextInputProps } from "react-native";
import { theme } from "@/theme";

export type InputProps = TextInputProps & {
  isError?: boolean;
};

const Input = forwardRef<TextInput, InputProps>((props: InputProps, ref) => {
  const { isError, ...rest } = props;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      {...rest}
      style={[
        styles.input,
        isFocused && styles.focused,
        isError && styles.error,
      ]}
      ref={ref}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
});

Input.displayName = "Input";

export default Input;

const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.colors.white,
    paddingVertical: theme.padding.sm,
    paddingHorizontal: theme.padding.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    fontSize: theme.fontSize.md,
    color: theme.colors.base,
    elevation: 3,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    width: "100%",
    minHeight: theme.formElement.minHeight,
  },
  focused: {
    borderColor: theme.colors.primary,
    shadowColor: theme.colors.primary,
    borderBottomWidth: 2,
  },
  error: {
    borderColor: theme.colors.danger,
    shadowColor: theme.colors.danger,
    borderBottomWidth: 2,
  },
});
