import { useQuery } from "@tanstack/react-query";
import { fetchAllProjects } from "../api";
import type { ProjectResponse } from "../api";
import { projectKeys } from "../queryKeys";

export const useFetchAllProjects = () => {
  return useQuery<ProjectResponse[]>({
    queryKey: projectKeys.all,
    queryFn: fetchAllProjects,
  });
};
