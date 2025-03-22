import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { PROJECTS_KEY } from "@/app/(tabs)/projects/api/api";
import type { NewProject } from "@/app/(tabs)/projects/api/api";
import { TASK_STATUSES } from "../constants";

export type Task = {
  id: string;
  projectId: string;
  name: string;
  description: string;
};

export type TaskResponse = Task & {
  projectId: string;
};

export const TASKS_KEY = "tasks";

export const fetchAllTasks = async (
  projectId: string,
): Promise<TaskResponse[]> => {
  const storedTasks = await AsyncStorage.getItem(TASKS_KEY);
  const allTasks = storedTasks ? JSON.parse(storedTasks) : [];

  return allTasks.filter((task: TaskResponse) => projectId === task.projectId);
};

export const createNewTask = async (projectId: string, data: Task) => {
  const currentTasks = await fetchAllTasks(projectId);

  const storedProjects = await AsyncStorage.getItem(PROJECTS_KEY);

  const projects = storedProjects ? JSON.parse(storedProjects) : [];

  const taskId = uuid.v4();

  const newTask = {
    ...data,
    status: TASK_STATUSES.TO_DO,
    projectId,
    id: taskId,
  };

  const updatedProjects = projects.map((project: NewProject) => {
    if (project.id === projectId) {
      return {
        ...project,
        tasks: project.tasks ? [...project.tasks, taskId] : [taskId],
      };
    }
    return project;
  });

  await AsyncStorage.setItem(PROJECTS_KEY, JSON.stringify(updatedProjects));

  await AsyncStorage.setItem(
    TASKS_KEY,
    JSON.stringify([...currentTasks, newTask]),
  );
};
