import { useRouter, useLocalSearchParams } from "expo-router";

import React from "react";
import { useFetchAllTasks } from "./api/queries/useFetchAllTasks";
import ErrorScreen from "@/components/errorScreen";
import EmptyList from "@/components/list/emptyList";

import ScreenContainer from "@/components/screenContainer";
import ScreenLoader from "@/components/screenLoader";

import Button from "@/components/button";
import { translate } from "@/i18n";
import TasksCarousel from "./components/TasksCarousel";

const TasksScreen = () => {
  const { projectId }: { projectId: string } = useLocalSearchParams();
  const router = useRouter();

  const { data, isError, isLoading, refetch } = useFetchAllTasks();

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
                <Button
                  onPress={() =>
                    router.navigate(`projects/${projectId}/tasks/addTask`)
                  }
                >
                  {translate("task.addNewTask")}
                </Button>
              }
              title="task.emptyList.TITLE"
              description="task.emptyList.DESCRIPTION"
            />
          ),
          data: <TasksCarousel data={data!} />,
        }[state]
      }
    </ScreenContainer>
  );
};

export default TasksScreen;
