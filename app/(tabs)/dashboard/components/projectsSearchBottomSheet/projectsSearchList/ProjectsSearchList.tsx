import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { useBottomSheet } from "@gorhom/bottom-sheet";

import ListCardItem from "@/components/list/listCardItem";
import type { ProjectStatisticsResponse } from "../../../api/api";

type Props = {
  data: ProjectStatisticsResponse[];
  onSelectProject: (task: ProjectStatisticsResponse) => void;
};

const ProjectsSearchBottomSheet = ({ data, onSelectProject }: Props) => {
  const { close } = useBottomSheet();

  return (
    <View style={styles.dataContainer}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ListCardItem
            title={item.name}
            description={item.description}
            onPress={() => {
              onSelectProject(item);
              close();
            }}
          />
        )}
      />
    </View>
  );
};

ProjectsSearchBottomSheet.displayName = "ProjectsSearchBottomSheet";

export default ProjectsSearchBottomSheet;

const styles = StyleSheet.create({
  dataContainer: {
    flex: 1,
    height: "100%",
    justifyContent: "space-between",
  },
});
