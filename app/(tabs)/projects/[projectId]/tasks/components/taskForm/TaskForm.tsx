import React from "react";
import { useForm, Controller } from "react-hook-form";
import InputField from "@/components/form/inputField";
import { useTranslation } from "react-i18next";
import type { Task } from "../../api/api";
import Button from "@/components/button";

const I18N_TRANSLATION_PATH = "task.taskForm";

type Props = {
  defaultValues?: Task;
  onSubmit: (values: Task) => void;
  isLoading?: boolean;
  submitText: string;
};

const TaskForm = ({
  defaultValues = undefined,
  isLoading,
  submitText,
  onSubmit,
}: Props) => {
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Task>({ defaultValues });

  return (
    <>
      <Controller
        control={control}
        render={({ field: { onBlur, onChange, value, ref, name } }) => {
          return (
            <InputField
              label={t(`${I18N_TRANSLATION_PATH}.nameField.LABEL`)}
              placeholder={t(`${I18N_TRANSLATION_PATH}.nameField.PLACEHOLDER`)}
              errorMessage={errors[name]?.message as string}
              value={value}
              onBlur={onBlur}
              ref={ref}
              onChangeText={(value) => onChange(value)}
            />
          );
        }}
        name="name"
        rules={{
          required: t(`${I18N_TRANSLATION_PATH}.nameField.validation.REQUIRED`),
        }}
      />
      <Controller
        control={control}
        render={({ field: { onBlur, onChange, value, ref, name } }) => (
          <InputField
            label={t(`${I18N_TRANSLATION_PATH}.descriptionField.LABEL`)}
            placeholder={t(
              `${I18N_TRANSLATION_PATH}.descriptionField.PLACEHOLDER`,
            )}
            errorMessage={errors[name]?.message as string}
            multiline
            value={value}
            onBlur={onBlur}
            ref={ref}
            onChangeText={(value) => onChange(value)}
          />
        )}
        name="description"
        rules={{
          required: t(
            `${I18N_TRANSLATION_PATH}.descriptionField.validation.REQUIRED`,
          ),
        }}
      />
      <Button
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading || Object.keys(errors).length > 0}
      >
        {submitText}
      </Button>
    </>
  );
};

export default TaskForm;
