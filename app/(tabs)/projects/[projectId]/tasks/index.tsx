import { Link, useRouter, useLocalSearchParams } from "expo-router";

import React from "react";
import { useFetchAllTasks } from "./api/queries/useFetchAllTasks";
import ErrorScreen from "@/components/errorScreen";
import EmptyList from "@/components/list/emptyList";

import AddTaskButton from "./components/addTaskButton";

import ScreenContainer from "@/components/screenContainer";
import ScreenLoader from "@/components/screenLoader";
import TaskCard from "./components/taskCard";

import Button from "@/components/button";
import { translate } from "@/i18n";

const TasksScreen = () => {
  const { projectId }: { projectId: string } = useLocalSearchParams();
  const router = useRouter();

  const { data, isError, isLoading, refetch } = useFetchAllTasks(projectId);

  console.log("TasksScreen", data);

  const getState = () => {
    if (isLoading) return "loading";
    if (isError) return "error";
    if (data?.length === 0) return "empty";

    return "data";
  };

  const state = getState();

  return (
    <ScreenContainer>
      <Link
        href="projects/[projectId]/tasks/editTask"
        style={{ textAlign: "center", marginBottom: 18, fontSize: 24 }}
      >
        Go to /edit Task
      </Link>
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
          data: (
            <>
              {data?.map((item) => {
                return <TaskCard key={item.id} {...item} />;
              })}
              <AddTaskButton />
            </>
          ),
        }[state]
      }
    </ScreenContainer>
  );
};

export default TasksScreen;
