import React from "react";
import { FlatList } from "react-native";
import type { NewProject } from "@/app/(tabs)/projects/api/api";
import ProjectItem from "./ProjectItem";

type Props = {
  data: NewProject[];
};

const ProjectList = ({ data }: Props) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <ProjectItem
          id={item.id}
          name={item.name}
          description={item.description}
        />
      )}
    />
  );
};

export default ProjectList;
