import { View, Text } from "react-native";
import { Link } from "expo-router";

const ProjectsScreen = () => {
  return (
    <View>
      <Link
        href="/projects/addProject"
        style={{ textAlign: "center", marginBottom: 18, fontSize: 24 }}
      >
        Go to /add Projects
      </Link>
      <Link
        href="/projects/editProject"
        style={{ textAlign: "center", marginBottom: 18, fontSize: 24 }}
      >
        Go to /edit Projects
      </Link>
      <Link
        href="/projects/tasks"
        style={{ textAlign: "center", marginBottom: 18, fontSize: 24 }}
      >
        Go to Tasks
      </Link>

      <Text>ProjectsScreen11</Text>
    </View>
  );
};

export default ProjectsScreen;
