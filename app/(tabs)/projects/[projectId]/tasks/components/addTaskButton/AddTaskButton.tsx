import React from "react";
import { Link } from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useLocalSearchParams } from "expo-router";

const AddTaskButton = () => {
  const { projectId }: { projectId: string } = useLocalSearchParams();

  return (
    <Link href={`projects/${projectId}/tasks/addTask`}>
      <FontAwesome6 name="add" size={24} color="black" />
    </Link>
  );
};

export default AddTaskButton;
