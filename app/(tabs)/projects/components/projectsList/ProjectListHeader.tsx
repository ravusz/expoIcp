import React from "react";
import { translate } from "@/i18n";
import SearchInput from "@/components/searchInput";
import { Link } from "expo-router";
import { View, StyleSheet } from "react-native";
import Button from "@/components/button";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

type Props = {
  search?: string;
  setSearch: (value: string) => void;
};

const ProjectListHeader = ({ search, setSearch }: Props) => {
  return (
    <View style={styles.container}>
      <SearchInput
        placeholder={translate("project.SEARCH_PLACEHOLDER")}
        value={search}
        onChangeText={setSearch}
      />
      <Link href="/project">
        <Button>
          <FontAwesome6 name="add" size={24} color="black" />
        </Button>
      </Link>
    </View>
  );
};

export default ProjectListHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
