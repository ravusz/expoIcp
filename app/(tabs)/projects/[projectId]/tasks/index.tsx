import { View, Text } from "react-native";
import { Link } from "expo-router";
import AddTaskButton from "./components/addTaskButton";

const TasksScreen = () => {
  return (
    <View>
      <Link
        href="projects/[projectId]/tasks/addTask"
        style={{ textAlign: "center", marginBottom: 18, fontSize: 24 }}
      >
        Go to /add Task
      </Link>
      <Link
        href="projects/[projectId]/tasks/editTask"
        style={{ textAlign: "center", marginBottom: 18, fontSize: 24 }}
      >
        Go to /edit Task
      </Link>
      <Text>TasksScreen</Text>
      <AddTaskButton />
    </View>
  );
};

export default TasksScreen;
