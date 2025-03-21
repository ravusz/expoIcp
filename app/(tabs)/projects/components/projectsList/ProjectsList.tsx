import React, { useState } from "react";
import { FlatList } from "react-native";
import type { NewProject } from "@/app/(tabs)/api/api";
import ProjectItem from "./ProjectItem";
import ProjectListHeader from "./ProjectListHeader";
import { View } from "react-native";

type Props = {
  data: NewProject[];
};

const ProjectList = ({ data }: Props) => {
  const [search, setSearch] = useState<string | undefined>();

  const filteredData = search
    ? data.filter(
        ({ name, description }) =>
          name.toLowerCase().includes(search.toLowerCase()) ||
          description.toLowerCase().includes(search.toLowerCase()),
    )
    : data;

  return (
    <View>
      <ProjectListHeader search={search} setSearch={setSearch} />
      <FlatList
        data={filteredData}
        renderItem={({ item }) => (
          <ProjectItem
            id={item.id}
            name={item.name}
            description={item.description}
          />
        )}
      />
    </View>
  );
};

export default ProjectList;
