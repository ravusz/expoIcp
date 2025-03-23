import React, { useRef, useState } from "react";
import type { TextInputProps } from "react-native";
import Input from "@/components/input";
import debounce from "lodash.debounce";
import { translate } from "@/i18n";

type SearchInputProps = {
  value: TextInputProps["value"];
  placeholder: TextInputProps["placeholder"];
  onChangeText: TextInputProps["onChangeText"];
};

const SearchInput = ({ value, onChangeText }: SearchInputProps) => {
  const [search, setSearch] = useState(value);

  const debouncedSearch = useRef(
    debounce((text: string) => {
      onChangeText?.(text);
    }, 500),
  ).current;

  const handleChangeText = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  return (
    <Input
      value={search}
      onChangeText={handleChangeText}
      placeholder={translate("SEARCH_INPUT_PLACEHOLDER")}
    />
  );
};

SearchInput.displayName = "SearchInput";

export default SearchInput;
