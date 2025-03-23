import React from "react";
import { translate } from "@/i18n";

import LinkButton from "@/components/linkButton";

const AddProjectButton = () => {
  return (
    <LinkButton href="/projects/addProject" iconName="add">
      {translate("project.addNewProject")}
    </LinkButton>
  );
};

export default AddProjectButton;
