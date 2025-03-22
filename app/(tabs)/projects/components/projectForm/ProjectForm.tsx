import React from "react";
import { useForm, Controller } from "react-hook-form";
import InputField from "@/components/form/inputField";
import { translate } from "@/i18n";
import type { NewProject } from "@/app/(tabs)/api/api";
import Button from "@/components/button";

const I18N_TRANSLATION_PATH = "project.newProjectForm";

type Props = {
  defaultValues?: NewProject;
  onSubmit: (values: NewProject) => void;
  isLoading?: boolean;
};

const ProjectForm = ({
  defaultValues = undefined,
  isLoading,
  onSubmit,
}: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewProject>({ defaultValues });

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
      >
        {translate(`${I18N_TRANSLATION_PATH}.SUBMIT_BUTTON_LABEL`)}
      </Button>
    </>
  );
};

export default ProjectForm;
