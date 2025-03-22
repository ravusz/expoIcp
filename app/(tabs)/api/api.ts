import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

export type NewProject = {
  id: string;
  name: string;
  description: string;
};

export const fetchAllProjects = async () => {
  const storedProjects = await AsyncStorage.getItem("projects");

  return storedProjects ? JSON.parse(storedProjects) : [];
};

export const createNewProject = async (data: NewProject) => {
  const currentProjects = await fetchAllProjects();

  await AsyncStorage.setItem(
    "projects",
    JSON.stringify([...currentProjects, { ...data, id: uuid.v4() }]),
  );
};

export const deleteProject = async (projectId: string) => {
  const currentProjects = await fetchAllProjects();

  const updatedProjects = currentProjects.filter(
    (project: NewProject) => project.id !== projectId,
  );

  await AsyncStorage.setItem("projects", JSON.stringify(updatedProjects));
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

  await AsyncStorage.setItem("projects", JSON.stringify(updatedProjects));
};
