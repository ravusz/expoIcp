import React from "react";
import IconButton from "@/components/iconButton";
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

  return <IconButton onPress={onEdit} variant="info" name="pencil-outline" />;
};

export default EditActionButton;
