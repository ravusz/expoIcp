import React from "react";
import { useForm, Controller } from "react-hook-form";
import InputField from "@/components/form/inputField";
import { translate } from "@/i18n";
import type { ProjectResponse, Project } from "@/app/(tabs)/projects/api/api";
import Button from "@/components/button";

const I18N_TRANSLATION_PATH = "project.projectForm";

type Props = {
  defaultValues?: ProjectResponse;
  onSubmit: (values: Project) => void;
  isLoading?: boolean;
  submitText: string;
};

const ProjectForm = ({
  defaultValues = undefined,
  isLoading,
  submitText,
  onSubmit,
}: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Project>({ defaultValues });

  return (
    <>
      <Controller
        control={control}
        render={({ field: { onBlur, onChange, value, ref, name } }) => {
          return (
            <InputField
              label={translate(`${I18N_TRANSLATION_PATH}.nameField.LABEL`)}
              placeholder={translate(
                `${I18N_TRANSLATION_PATH}.nameField.PLACEHOLDER`,
              )}
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
          required: translate(
            `${I18N_TRANSLATION_PATH}.nameField.validation.REQUIRED`,
          ),
        }}
      />
      <Controller
        control={control}
        render={({ field: { onBlur, onChange, value, ref, name } }) => (
          <InputField
            label={translate(`${I18N_TRANSLATION_PATH}.descriptionField.LABEL`)}
            placeholder={translate(
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
          required: translate(
            `${I18N_TRANSLATION_PATH}.descriptionField.validation.REQUIRED`,
          ),
        }}
      />
      <Button
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading || Object.keys(errors).length > 0}
        isLoading={isLoading}
      >
        {submitText}
      </Button>
    </>
  );
};

export default ProjectForm;
