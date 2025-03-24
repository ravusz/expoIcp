import AsyncStorage from "@react-native-async-storage/async-storage";
import { filterProjects, groupBy } from "@/utils";
import { TASK_STATUSES } from "@/constants";

export type TotalStatistics = {
  count: {
    projects: number;
    tasks: number;
  };
};

export type ProjectResponse = {
  id: string;
  name: string;
  description: string;
  tasks: string[];
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

export const fetchProjectStatistics = async (search: string): Promise<any> => {
  const storedProjects = await AsyncStorage.getItem(PROJECTS_KEY);
  const storedTasks = await AsyncStorage.getItem(TASKS_KEY);

  const projects = storedProjects ? JSON.parse(storedProjects) : [];
  const tasks = storedTasks ? JSON.parse(storedTasks) : [];

  const filteredProjects = filterProjects<ProjectResponse>(search, projects);

  return filteredProjects.reduce((acc, current) => {
    const gropuedTasks = groupBy(
      tasks.filter(({ id }: any) => current?.tasks?.includes(id)),
      "status",
    );

    return [
      ...acc,
      {
        ...current,
        tasks: Object.values(TASK_STATUSES).reduce((acc, value) => {
          return {
            ...acc,
            [value]: gropuedTasks?.[value]?.length || 0,
          };
        }, {}),
      },
    ];
  }, []);
};
