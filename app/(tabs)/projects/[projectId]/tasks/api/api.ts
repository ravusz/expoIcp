import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { PROJECTS_KEY } from "@/app/(tabs)/projects/api/api";
import type { ProjectResponse } from "@/app/(tabs)/projects/api/api";
import { TASK_STATUSES } from "@/constants";

export type TaskStatus = keyof typeof TASK_STATUSES;

export type Task = {
  projectId: string;
  name: string;
  description: string;
  status: TaskStatus;
};

export type TaskResponse = Task & {
  id: string;
  order: number;
};

export const TASKS_KEY = "tasks";

export const fetchAllTasks = async (): Promise<TaskResponse[]> => {
  const storedTasks = await AsyncStorage.getItem(TASKS_KEY);
  const allTasks = storedTasks ? JSON.parse(storedTasks) : [];

  return allTasks;
};

export const fetchAllProjectTasks = async (
  projectId: string,
): Promise<TaskResponse[]> => {
  const storedTasks = await AsyncStorage.getItem(TASKS_KEY);
  const allTasks = storedTasks ? JSON.parse(storedTasks) : [];

  return allTasks.filter((task: TaskResponse) => projectId === task.projectId);
};

export const createNewTask = async (projectId: string, data: Task) => {
  const currentTasks = await fetchAllTasks();

  const storedProjects = await AsyncStorage.getItem(PROJECTS_KEY);

  const projects = storedProjects ? JSON.parse(storedProjects) : [];

  const taskId = uuid.v4();

  const newTask = {
    ...data,
    status: TASK_STATUSES.TO_DO,
    projectId,
    id: taskId,
    order: currentTasks.filter(({ status }) => status === TASK_STATUSES.TO_DO)
      .length,
  };

  const updatedProjects = projects.map((project: ProjectResponse) => {
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

export const editTask = async (
  projectId: string,
  taskId: string,
  data: Task,
) => {
  const currentTasks = await fetchAllTasks();

  const updatedTasks = currentTasks.map((task: TaskResponse) =>
    task.id === taskId
      ? {
        ...task,
        ...data,
      }
      : task,
  );

  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
};

export const fetchTaskById = async (
  projectId: string,
  taskId: string,
): Promise<TaskResponse | undefined> => {
  const currentTasks = await fetchAllTasks();

  return currentTasks.find((item: TaskResponse) => item.id === taskId);
};

export const deleteTask = async (projectId: string, taskId: string) => {
  const currentTasks = await fetchAllTasks();

  const updatedTasks = currentTasks.filter(
    (task: TaskResponse) => task.id !== taskId,
  );

  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
};

export const updateTaskStatus = async (taskId: string, status: TaskStatus) => {
  const currentTasks = await fetchAllTasks();

  const updatedTasks = currentTasks.map((task: TaskResponse) =>
    task.id === taskId
      ? {
        ...task,
        status,
        order: currentTasks.filter((task) => task.status === status).length,
      }
      : task,
  );

  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
};

export const updateTasksOrder = async (ids: string[], status: TaskStatus) => {
  const currentTasks = await fetchAllTasks();

  const updatedTasks = currentTasks.map((task: TaskResponse) =>
    task.status === status
      ? { ...task, order: ids.findIndex((id) => id === task.id) }
      : task,
  );

  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
};
