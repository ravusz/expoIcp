import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";

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
    JSON.stringify([...currentProjects, { ...data, id: uuidv4() }]),
  );
};

export const deleteProject = async (projectId: string) => {
  const currentProjects = await fetchAllProjects();

  const updatedProjects = currentProjects.filter(
    (project: NewProject) => project.id !== projectId,
  );

  await AsyncStorage.setItem("projects", JSON.stringify(updatedProjects));
};
