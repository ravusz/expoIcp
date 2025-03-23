import React, { forwardRef } from "react";
import { View, StyleSheet } from "react-native";
import Input from "@/components/input";
import Label from "@/components/form/label";
import ValidationErrorMessage from "@/components/form/validationErrorMessage";
import type { ValidationErrorMessageProps } from "@/components/form/validationErrorMessage/ValidationErrorMessage";
import type { InputProps } from "@/components/input/Input";
import { TextInput } from "react-native";
import { theme } from "@/theme";

type Props = InputProps &
  ValidationErrorMessageProps & {
    label: string;
  };

const InputField = forwardRef<TextInput, Props>(
  ({ label, errorMessage, ...rest }: Props, ref) => {
    return (
      <View style={styles.container}>
        <Label>{label}</Label>
        <Input {...rest} ref={ref} isError={!!errorMessage} />
        <ValidationErrorMessage errorMessage={errorMessage} />
      </View>
    );
  },
);

InputField.displayName = "InputField";

export default InputField;

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.margin.md,
  },
});
