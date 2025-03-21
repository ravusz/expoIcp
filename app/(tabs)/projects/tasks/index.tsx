import { View, Text } from "react-native";
import { Link } from "expo-router";

const TasksScreen = () => {
  return (
    <View>
      <Link
        href="projects/tasks/addTask"
        style={{ textAlign: "center", marginBottom: 18, fontSize: 24 }}
      >
        Go to /add Task
      </Link>
      <Link
        href="projects/tasks/editTask"
        style={{ textAlign: "center", marginBottom: 18, fontSize: 24 }}
      >
        Go to /edit Task
      </Link>
      <Text>TasksScreen</Text>
    </View>
  );
};

export default TasksScreen;
