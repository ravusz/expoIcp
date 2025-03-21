import React, { useRef, useState } from "react";
import type { TextInputProps } from "react-native";
import Input from "@/components/input";
import debounce from "lodash.debounce";

type SearchInputProps = {
  value: TextInputProps["value"];
  placeholder: TextInputProps["placeholder"];
  onChangeText: TextInputProps["onChangeText"];
};

const SearchInput = ({ value, onChangeText }: SearchInputProps) => {
  const [search, setSearch] = useState("");

  const debouncedSearch = useRef(
    debounce((text) => {
      onChangeText?.(text);
    }, 500),
  ).current;

  const handleChangeText = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  return <Input value={search} onChangeText={handleChangeText} />;
};

SearchInput.displayName = "SearchInput";

export default SearchInput;
