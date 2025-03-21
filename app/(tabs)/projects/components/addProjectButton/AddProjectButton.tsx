import React from "react";
import { Link } from "expo-router";
import Button from "@/components/button";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const AddProjectButton = () => {
  return (
    <Link href="/projects/addProject">
      <Button>
        <FontAwesome6 name="add" size={24} color="black" />
      </Button>
    </Link>
  );
};

export default AddProjectButton;
