import { forwardRef } from "react";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import Button from "@/components/button";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useFetchTaskById } from "@/tasksApi/queries/useFetchTaskById";
import ScreenLoader from "@/components/screenLoader";
import ErrorScreen from "@/components/errorScreen";
import TaskStatusChanger from "../taskStatusChanger";
import EditActionButton from "./EditActionButton";
import DeleteActionButton from "./DeleteActionButton";
import { theme } from "@/theme";
import { TaskStatus } from "@/tasksApi/api";

type Props = {
  projectId: string;
  taskId: string;
  status: TaskStatus;
};

const ActionsBottomSheet = forwardRef<BottomSheet, Props>(
  ({ projectId, taskId, status }: Props, ref) => {
    const { t } = useTranslation();

    const { data, isLoading, isError, refetch } = useFetchTaskById(
      projectId,
      taskId,
    );

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
              empty: <Text style={styles.emptyText}>No data</Text>,
              data: (
                <View style={styles.dataContainer}>
                  <View>
                    <Text
                      style={styles.title}
                      numberOfLines={2}
                      ellipsizeMode="tail"
                    >
                      {data?.name}
                    </Text>

                    <Text
                      style={styles.description}
                      numberOfLines={5}
                      ellipsizeMode="tail"
                    >
                      {data?.description}
                    </Text>
                  </View>

                  <TaskStatusChanger
                    projectId={projectId}
                    taskId={taskId}
                    status={status}
                  />
                  <View style={styles.buttonWrapper}>
                    <EditActionButton projectId={projectId} taskId={taskId} />
                    <DeleteActionButton projectId={projectId} taskId={taskId} />
                  </View>
                </View>
              ),
            }[state]
          }
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

ActionsBottomSheet.displayName = "ActionsBottomSheet";

export default ActionsBottomSheet;

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
