import { useQuery } from "@tanstack/react-query";
import { fetchProjectById } from "../api";
import type { NewProject } from "../api";
import { projectKeys } from "../queryKeys";

export const useFetchProjectById = ({ projectId }: { projectId: string }) => {
  return useQuery<NewProject>({
    queryKey: [projectKeys.byId(projectId)],
    queryFn: () => fetchProjectById({ projectId }),
  });
};
