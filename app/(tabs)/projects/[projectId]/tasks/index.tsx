import { useRouter, useLocalSearchParams } from "expo-router";

import React from "react";
import { useFetchAllProjectTasks } from "./api/queries/useFetchAllProjectTasks";
import ErrorScreen from "@/components/errorScreen";
import EmptyList from "@/components/list/emptyList";

import ScreenContainer from "@/components/screenContainer";
import ScreenLoader from "@/components/screenLoader";

import Button from "@/components/button";
import { useTranslation } from "react-i18next";
import TasksCarousel from "./components/TasksCarousel";

const TasksScreen = () => {
  const { t } = useTranslation();

  const { projectId }: { projectId: string } = useLocalSearchParams();
  const router = useRouter();

  const { data, isError, isLoading, refetch } =
    useFetchAllProjectTasks(projectId);

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
                  {t("errorScreen.REFRESH")}
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
                  {t("task.addNewTask")}
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
