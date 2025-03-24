import React from "react";
import { StyleSheet, View } from "react-native";
import { useBottomSheet } from "@gorhom/bottom-sheet";

import ListCardItem from "@/components/list/listCardItem";
import type { ProjectStatisticsResponse } from "../../../api/api";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";

type Props = {
  data: ProjectStatisticsResponse[];
  onSelectProject: (task: ProjectStatisticsResponse) => void;
};

const ProjectsSearchList = ({ data, onSelectProject }: Props) => {
  const { close } = useBottomSheet();

  return (
    <View style={styles.dataContainer}>
      <BottomSheetFlatList
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

ProjectsSearchList.displayName = "ProjectsSearchBottomSheet";

export default ProjectsSearchList;

const styles = StyleSheet.create({
  dataContainer: {
    flex: 1,
    height: "100%",
    justifyContent: "space-between",
  },
});
