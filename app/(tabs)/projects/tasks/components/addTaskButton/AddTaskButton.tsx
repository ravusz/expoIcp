import React from "react";
import { Link } from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const AddTaskButton = () => {
  return (
    <Link href="projects/tasks/addTask">
      <FontAwesome6 name="add" size={24} color="black" />
    </Link>
  );
};

export default AddTaskButton;
