import React from "react";
import { useTranslation } from "react-i18next";
import SearchInput from "@/components/searchInput";

type Props = {
  search?: string;
  setSearch: (value: string) => void;
};

const ProjectSearchInput = ({ search, setSearch }: Props) => {
  const { t } = useTranslation();

  return (
    <SearchInput
      placeholder={t("project.SEARCH_PLACEHOLDER")}
      value={search}
      onChangeText={setSearch}
    />
  );
};

export default ProjectSearchInput;
