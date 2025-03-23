import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

export type Project = {
  name: string;
  description: string;
  tasks: string[];
};

export type ProjectResponse = Project & {
  id: string;
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

  return projects.find((item: ProjectResponse) => item.id === projectId);
};

export const createNewProject = async (data: Project) => {
  const currentProjects = await fetchAllProjects();

  await AsyncStorage.setItem(
    PROJECTS_KEY,
    JSON.stringify([...currentProjects, { ...data, id: uuid.v4() }]),
  );
};

export const deleteProject = async (projectId: string) => {
  const currentProjects = await fetchAllProjects();

  const updatedProjects = currentProjects.filter(
    (project: ProjectResponse) => project.id !== projectId,
  );

  await AsyncStorage.setItem(PROJECTS_KEY, JSON.stringify(updatedProjects));
};

export const editProject = async (projectId: string, data: Project) => {
  const currentProjects = await fetchAllProjects();

  const updatedProjects = currentProjects.map((project: ProjectResponse) =>
    project.id === projectId
      ? {
        ...project,
        ...data,
      }
      : project,
  );

  await AsyncStorage.setItem(PROJECTS_KEY, JSON.stringify(updatedProjects));
};
