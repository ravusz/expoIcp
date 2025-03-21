import React, { forwardRef } from "react";
import { View } from "react-native";
import Input from "@/components/input";
import Label from "@/components/form/label";
import ValidationErrorMessage from "@/components/form/validationErrorMessage";
import type { ValidationErrorMessageProps } from "@/components/form/validationErrorMessage/ValidationErrorMessage";

import type { InputProps } from "@/components/input/Input";

import { TextInput } from "react-native";

type Props = InputProps &
  ValidationErrorMessageProps & {
    label: string;
  };

const InputField = forwardRef<TextInput, Props>(
  ({ label, errorMessage, ...rest }: Props, ref) => {
    return (
      <View>
        <Label>{label}</Label>
        <Input {...rest} ref={ref} />
        <ValidationErrorMessage errorMessage={errorMessage} />
      </View>
    );
  },
);

InputField.displayName = "InputField";

export default InputField;
