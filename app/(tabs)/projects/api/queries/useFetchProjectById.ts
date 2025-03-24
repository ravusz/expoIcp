import { useQuery } from "@tanstack/react-query";
import { fetchProjectById } from "../api";
import type { ProjectResponse } from "../api";
import { projectKeys } from "../queryKeys";

export const useFetchProjectById = (projectId: string) => {
  return useQuery<ProjectResponse>({
    queryKey: projectKeys.byId(projectId),
    queryFn: () => fetchProjectById({ projectId }),
  });
};
