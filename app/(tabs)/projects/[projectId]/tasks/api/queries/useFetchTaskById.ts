import { useQuery } from "@tanstack/react-query";
import { fetchTaskById } from "../api";
import type { TaskResponse } from "../api";
import { taskKeys } from "../queryKeys";

export const useFetchTaskById = (projectId: string, taskId: string) => {
  return useQuery<TaskResponse | undefined>({
    queryKey: taskKeys.byId(projectId, taskId),
    queryFn: () => fetchTaskById(projectId, taskId),
    enabled: !!projectId || !!taskId,
  });
};
