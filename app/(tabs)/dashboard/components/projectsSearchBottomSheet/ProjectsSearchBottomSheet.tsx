import { forwardRef, useState } from "react";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import BottomSheet from "@gorhom/bottom-sheet";
import ScreenLoader from "@/components/screenLoader";
import ErrorScreen from "@/components/errorScreen";
import SearchInput from "@/components/searchInput";
import { useFetchProjectStatistics } from "../../api/queries/useFetchProjectStatistics";
import Button from "@/components/button";
import type { ProjectStatisticsResponse } from "../../api/api";
import ProjectsSearchList from "./projectsSearchList";
import { useInvalidateQueries } from "../../hooks/useInvalidateQueries";
import { statisticsKeys } from "../../api/queryKeys";

import { theme } from "@/theme";

type Props = {
  onSelectProject: (task: ProjectStatisticsResponse) => void;
};

const ProjectsSearchBottomSheet = forwardRef<BottomSheet, Props>(
  ({ onSelectProject }, ref) => {
    const { t } = useTranslation();

    const [search, setSearch] = useState<string>("");

    const { data, isLoading, isError, refetch } =
      useFetchProjectStatistics(search);

    const getState = () => {
      if (isLoading) return "loading";
      if (isError) return "error";
      if (!data) return "empty";
      return "data";
    };

    const state = getState();

    useInvalidateQueries([...statisticsKeys.byProjectSearch(search)]);

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={["100%"]}
        enablePanDownToClose
        enableDynamicSizing={false}
      >
        <View style={styles.contentContainer}>
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
                      {t("errorScreen.REFRESH")}
                    </Button>
                  }
                />
              ),
              empty: (
                <View style={{ marginTop: theme.margin.xl }}>
                  <Text style={styles.emptyText}>
                    {t("statistics.NO_DATA")}
                  </Text>
                </View>
              ),
              data: (
                <ProjectsSearchList
                  data={data!}
                  onSelectProject={onSelectProject}
                />
              ),
            }[state]
          }
        </View>
      </BottomSheet>
    );
  },
);

ProjectsSearchBottomSheet.displayName = "ProjectsSearchBottomSheet";

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
    color: theme.colors.base,
    fontSize: theme.fontSize.sm,
    fontWeight: "600",
  },
});
