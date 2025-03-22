import { useCallback, forwardRef } from "react";

import React from "react";
import { StyleSheet } from "react-native";
import ActionButton from "@/components/actionButton";
import { useDeleteTask } from "../../../../api/mutations/useDeleteTask";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { translate } from "@/i18n";

import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

type Props = {
  projectId: string;
  taskId: string;
};

const ActionsBottomSheet = forwardRef<BottomSheet, Props>(
  ({ projectId, taskId }: Props, ref) => {
    const { isPending, mutate } = useDeleteTask();
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

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={["13%"]}
        enablePanDownToClose
      >
        <BottomSheetView style={styles.contentContainer}>
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
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

ActionsBottomSheet.displayName = "ActionsBottomSheet";

export default ActionsBottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: "row",
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
});
