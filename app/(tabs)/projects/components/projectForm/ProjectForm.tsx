import React from "react";
import { useForm, Controller } from "react-hook-form";
import InputField from "@/components/form/inputField";
import { translate } from "@/i18n";
import { useCreateNewProject } from "@/app/(tabs)/api/mutations/useCreateNewProject";
import type { NewProject } from "@/app/(tabs)/api/api";
import { useRouter } from "expo-router";
import Button from "@/components/button";

const I18N_TRANSLATION_PATH = "project.newProjectForm";

const ProjectForm = () => {
  const router = useRouter();
  const { mutate, isPending } = useCreateNewProject();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewProject>();

  const onSubmit = (data: NewProject) => {
    mutate(data, {
      onSuccess: () => {
        router.back();
      },
    });
  };

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
        disabled={isPending || Object.keys(errors).length > 0}
      >
        {translate(`${I18N_TRANSLATION_PATH}.SUBMIT_BUTTON_LABEL`)}
      </Button>
    </>
  );
};

export default ProjectForm;
