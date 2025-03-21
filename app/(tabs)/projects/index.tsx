import { View, Text } from "react-native";
import { Link } from "expo-router";

import React from "react";
import { useFetchAllProjects } from "@/app/(tabs)/api/queries/useFetchAllProjects";
import ErrorScreen from "@/components/errorScreen";
import EmptyList from "@/components/list/emptyList";
import ProjectList from "./components/projectsList";

import { useRouter } from "expo-router";

import Button from "@/components/button";
import { translate } from "@/i18n";

const ProjectsScreen = () => {
  const { data, isError, isLoading, refetch } = useFetchAllProjects();
  const router = useRouter();

  const getState = () => {
    if (isLoading) return "loading";
    if (isError) return "error";
    if (data?.length === 0) return "empty";

    return "data";
  };

  const state = getState();

  return (
    <View>
      <Link
        href="/projects/addProject"
        style={{ textAlign: "center", marginBottom: 18, fontSize: 24 }}
      >
        Go to /add Projects
      </Link>
      <Link
        href="/projects/editProject"
        style={{ textAlign: "center", marginBottom: 18, fontSize: 24 }}
      >
        Go to /edit Projects
      </Link>
      <Link
        href="/projects/tasks"
        style={{ textAlign: "center", marginBottom: 18, fontSize: 24 }}
      >
        Go to Tasks
      </Link>

      <Text>ProjectsScreen11</Text>
      {
        {
          loading: <Text>loading</Text>,
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
          data: <ProjectList data={data!} />,
        }[state]
      }
    </View>
  );
};

export default ProjectsScreen;
