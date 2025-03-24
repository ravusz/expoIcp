import React from "react";
import { useTranslation } from "react-i18next";

import LinkButton from "@/components/linkButton";

const AddProjectButton = () => {
  const { t } = useTranslation();

  return (
    <LinkButton href="/projects/addProject" iconName="add">
      {t("project.addNewProject")}
    </LinkButton>
  );
};

export default AddProjectButton;
