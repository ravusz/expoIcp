import { forwardRef, useState } from "react";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import ActionButton from "@/components/actionButton";
import { useDeleteTask } from "../../../../api/mutations/useDeleteTask";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { translate } from "@/i18n";
import Button from "@/components/button";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useFetchTaskById } from "@/tasksApi/queries/useFetchTaskById";
import ScreenLoader from "@/components/screenLoader";
import ErrorScreen from "@/components/errorScreen";
import TaskStatusChanger from "../taskStatusChanger";
import { TASK_STATUSES } from "@/tasks/constants";

type Props = {
  projectId: string;
  taskId: string;
  status: keyof typeof TASK_STATUSES;
};

const ActionsBottomSheet = forwardRef<BottomSheet, Props>(
  ({ projectId, taskId, status }: Props, ref) => {
    const { isPending, mutate } = useDeleteTask();
    const { data, isLoading, isError, refetch } = useFetchTaskById(
      projectId,
      taskId,
    );

    const router = useRouter();

    const onDelete = () => {
      Alert.alert(
        translate("task.deleteConfirmation.TITLE"),
        translate("task.deleteConfirmation.DESCRIPTION"),
        [
          {
            text: translate("task.deleteConfirmation.CANCEL_BUTTON"),
            style: "cancel",
          },
          {
            text: translate("task.deleteConfirmation.SUBMIT_BUTTON"),
            onPress: () => mutate({ projectId, taskId }),
          },
        ],
        { cancelable: true },
      );
    };

    const onEdit = () => {
      router.navigate(`projects/${projectId}/tasks/${taskId}/editTask`);
    };

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
                      {translate("errorScreen.REFRESH")}
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
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {data?.name}
                    </Text>

                    <Text
                      style={styles.description}
                      numberOfLines={2}
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
                    <ActionButton
                      onPress={onEdit}
                      variant="success"
                      name="pencil-outline"
                    />
                    <ActionButton
                      onPress={onDelete}
                      variant="error"
                      name="delete-outline"
                      isLoading={isPending}
                    />
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
    padding: 24,
  },
  dataContainer: {
    flex: 1,
    justifyContent: "space-between",
    height: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    alignSelf: "flex-end", // Przyciska do dołu
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
  },
});
