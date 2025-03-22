import { useCallback, forwardRef } from "react";

import React from "react";
import { StyleSheet } from "react-native";
import ActionButton from "@/components/actionButton";

import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

const ActionsBottomSheet = forwardRef<BottomSheet, Props>(
  ({ onEdit, onDelete }: Props, ref) => {
    const handleSheetChanges = useCallback((index: number) => {
      console.log("handleSheetChanges", index);
    }, []);

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        onChange={handleSheetChanges}
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
            isLoading
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
