import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useFetchAllProjects } from "@/app/(tabs)/projects/api/queries/useFetchAllProjects";
import ErrorScreen from "@/components/errorScreen";
import EmptyList from "@/components/list/emptyList";
import ProjectList from "./components/projectsList";
import ProjectSearchInput from "./components/projectSearchInput";
import AddProjectButton from "./components/addProjectButton";
import ScreenContainer from "@/components/screenContainer";
import ScreenLoader from "@/components/screenLoader";
import Button from "@/components/button";
import { translate } from "@/i18n";
import { theme } from "@/theme";
import { filterProjects } from "@/utils";
import type { ProjectResponse } from "@/projectsApi/api";

const ProjectsScreen = () => {
  const { data, isError, isLoading, refetch } = useFetchAllProjects();
  const [search, setSearch] = useState<string | undefined>();

  const filteredData = filterProjects<ProjectResponse>(search, data);

  const getState = () => {
    if (isLoading) return "loading";
    if (isError) return "error";
    if (data?.length === 0) return "empty";
    return "data";
  };

  const state = getState();

  return (
    <ScreenContainer>
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
          empty: (
            <EmptyList
              button={
                <Button onPress={() => {}}>
                  {translate("project.addNewProject")}
                </Button>
              }
              title="project.emptyList.TITLE"
              description="project.emptyList.DESCRIPTON"
            />
          ),
          data: (
            <View style={styles.container}>
              <View style={styles.searchContainer}>
                <ProjectSearchInput search={search} setSearch={setSearch} />
              </View>
              <View style={styles.listContainer}>
                <ProjectList data={filteredData} />
              </View>
              <AddProjectButton />
            </View>
          ),
        }[state]
      }
    </ScreenContainer>
  );
};

export default ProjectsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.padding.lg,
  },
  searchContainer: {
    marginBottom: theme.margin.md,
  },
  listContainer: {
    flex: 1,
  },
});
