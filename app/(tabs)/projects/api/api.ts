import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

export type NewProject = {
  id: string;
  name: string;
  description: string;
  tasks: string[];
};

export const PROJECTS_KEY = "projects";

export const fetchAllProjects = async () => {
  const storedProjects = await AsyncStorage.getItem(PROJECTS_KEY);

  return storedProjects ? JSON.parse(storedProjects) : [];
};

export const fetchProjectById = async ({
  projectId,
}: {
  projectId: string;
}) => {
  const storedProjects = await AsyncStorage.getItem(PROJECTS_KEY);
  const projects = storedProjects ? JSON.parse(storedProjects) : [];

  return projects.find((item: NewProject) => item.id === projectId);
};

export const createNewProject = async (data: NewProject) => {
  const currentProjects = await fetchAllProjects();

  await AsyncStorage.setItem(
    PROJECTS_KEY,
    JSON.stringify([...currentProjects, { ...data, id: uuid.v4() }]),
  );
};

export const deleteProject = async (projectId: string) => {
  const currentProjects = await fetchAllProjects();

  const updatedProjects = currentProjects.filter(
    (project: NewProject) => project.id !== projectId,
  );

  await AsyncStorage.setItem(PROJECTS_KEY, JSON.stringify(updatedProjects));
};

export const editProject = async (projectId: string, data: NewProject) => {
  const currentProjects = await fetchAllProjects();

  const updatedProjects = currentProjects.map((project: NewProject) =>
    project.id === projectId
      ? {
        ...project,
        ...data,
      }
      : project,
  );

  await AsyncStorage.setItem(PROJECTS_KEY, JSON.stringify(updatedProjects));
};
