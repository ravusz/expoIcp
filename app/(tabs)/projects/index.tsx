import { View, Text } from "react-native";
import { Link } from "expo-router";

const ProjectsScreen = () => {
  return (
    <View>
      <Link
        href="/addProject"
        style={{ textAlign: "center", marginBottom: 18, fontSize: 24 }}
      >
        Go to /counter
      </Link>
      <Text>ProjectsScreen</Text>
    </View>
  );
};

export default ProjectsScreen;
