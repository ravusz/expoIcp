import React from "react";
import type { TaskResponse } from "../../../../api/api";
import { TouchableOpacity } from "react-native";
import ListCardItem from "@/components/list/listCardItem";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { theme } from "@/theme";

type Props = {
  task: TaskResponse;
  drag: () => void;
  isActive: boolean;
  onPress: () => void;
};

const TaskCard = ({ task, drag, isActive, onPress }: Props) => {
  return (
    <ListCardItem
      title={task.name}
      description={task.description}
      onPress={onPress}
      disabled={isActive}
      isActive={isActive}
    >
      <TouchableOpacity onLongPress={drag} disabled={isActive}>
        <MaterialCommunityIcons
          name="drag"
          size={24}
          color={theme.colors.base}
        />
      </TouchableOpacity>
    </ListCardItem>
  );
};

export default TaskCard;
