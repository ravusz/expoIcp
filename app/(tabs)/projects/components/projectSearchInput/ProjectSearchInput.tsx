import React from "react";
import { translate } from "@/i18n";
import SearchInput from "@/components/searchInput";

type Props = {
  search?: string;
  setSearch: (value: string) => void;
};

const ProjectSearchInput = ({ search, setSearch }: Props) => {
  return (
    <SearchInput
      placeholder={translate("project.SEARCH_PLACEHOLDER")}
      value={search}
      onChangeText={setSearch}
    />
  );
};

export default ProjectSearchInput;
