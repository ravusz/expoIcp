import { forwardRef, useState } from "react";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { translate } from "@/i18n";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import ScreenLoader from "@/components/screenLoader";
import ErrorScreen from "@/components/errorScreen";
import SearchInput from "@/components/searchInput";
import { useFetchProjectStatistics } from "../../api/queries/useFetchProjectStatistics";
import Button from "@/components/button";
import type { ProjectStatisticsResponse } from "../../api/api";
import ProjectsSearchList from "./projectsSearchList";

import { theme } from "@/theme";

type Props = {
  onSelectProject: (task: ProjectStatisticsResponse) => void;
};

const ProjectsSearchBottomSheet = forwardRef<BottomSheet, Props>(
  ({ onSelectProject }, ref) => {
    const [search, setSearch] = useState<string | undefined>();

    const { data, isLoading, isError, refetch } =
      useFetchProjectStatistics(search);

    const getState = () => {
      if (isLoading) return "loading";
      if (isError) return "error";
      if (!data) return "empty";
      return "data";
    };

    const state = getState();

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={["100%"]}
        enablePanDownToClose
      >
        <BottomSheetView style={styles.contentContainer}>
          <SearchInput
            placeholder="SEARCH_INPUT_PLACEHOLDER"
            value={search}
            onChangeText={setSearch}
          />
          {
            {
              loading: <ScreenLoader />,
              error: (
                <ErrorScreen
                  button={
                    <Button onPress={() => refetch()}>
                      {translate("errorScreen.REFRESH")}
                    </Button>
                  }
                />
              ),
              empty: <Text style={styles.emptyText}>No data</Text>,
              data: (
                <ProjectsSearchList
                  data={data!}
                  onSelectProject={onSelectProject}
                />
              ),
            }[state]
          }
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

ProjectsSearchBottomSheet.displayName = "ActionsBottomSheet";

export default ProjectsSearchBottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: theme.padding.xl,
  },
  dataContainer: {
    flex: 1,
    height: "100%",
    justifyContent: "space-between",
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: "bold",
    color: theme.colors.base,
    marginBottom: theme.padding.xl,
  },
  description: {
    fontSize: theme.fontSize.md,
    color: theme.colors.secondary,
  },
  actions: {
    marginTop: "auto",
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: theme.margin.md,
    alignSelf: "flex-end",
  },
  emptyText: {
    textAlign: "center",
    color: theme.colors.lightGray,
    fontSize: theme.fontSize.sm,
  },
});
