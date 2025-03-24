import AsyncStorage from "@react-native-async-storage/async-storage";

export type TotalStatistics = {
  count: {
    projects: number;
    tasks: number;
  };
};

const PROJECTS_KEY = "projects";
const TASKS_KEY = "tasks";

export const fetchTotalStatistics = async () => {
  const storedProjects = await AsyncStorage.getItem(PROJECTS_KEY);
  const storedTasks = await AsyncStorage.getItem(TASKS_KEY);

  const projects = storedProjects ? JSON.parse(storedProjects) : [];
  const tasks = storedTasks ? JSON.parse(storedTasks) : [];

  return {
    count: {
      projects: projects.length,
      tasks: tasks.length,
    },
  };
};
