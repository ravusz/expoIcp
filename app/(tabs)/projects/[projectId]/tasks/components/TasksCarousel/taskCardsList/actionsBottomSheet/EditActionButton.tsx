import React from "react";
import ActionButton from "@/components/actionButton";
import { useRouter } from "expo-router";
import { useBottomSheet } from "@gorhom/bottom-sheet";

type Props = {
  projectId: string;
  taskId: string;
};

const EditActionButton = ({ projectId, taskId }: Props) => {
  const router = useRouter();
  const { close } = useBottomSheet();

  const onEdit = () => {
    router.navigate(`projects/${projectId}/tasks/${taskId}/editTask`);
    close();
  };

  return (
    <ActionButton onPress={onEdit} variant="success" name="pencil-outline" />
  );
};

export default EditActionButton;
