import React from "react";
import { Link } from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const AddProjectButton = () => {
  return (
    <Link href="/projects/addProject">
      <FontAwesome6 name="add" size={24} color="black" />
    </Link>
  );
};

export default AddProjectButton;
