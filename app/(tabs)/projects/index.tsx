import { Text } from "react-native";

import React, { useState } from "react";
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

const ProjectsScreen = () => {
  const { data, isError, isLoading, refetch } = useFetchAllProjects();
  const [search, setSearch] = useState<string | undefined>();

  const filteredData =
    (search
      ? data?.filter(
        ({ name, description }) =>
          name.toLowerCase().includes(search.toLowerCase()) ||
            description.toLowerCase().includes(search.toLowerCase()),
      )
      : data) || [];

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
            <>
              <ProjectSearchInput search={search} setSearch={setSearch} />
              <ProjectList data={filteredData} />
              <AddProjectButton />
            </>
          ),
        }[state]
      }
    </ScreenContainer>
  );
};

export default ProjectsScreen;
