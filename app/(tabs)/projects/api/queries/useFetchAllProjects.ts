import { useQuery } from "@tanstack/react-query";
import { fetchAllProjects } from "../api";
import type { NewProject } from "../api";
import { projectKeys } from "../queryKeys";

export const useFetchAllProjects = () => {
  return useQuery<NewProject[]>({
    queryKey: [projectKeys.all],
    queryFn: fetchAllProjects,
  });
};
