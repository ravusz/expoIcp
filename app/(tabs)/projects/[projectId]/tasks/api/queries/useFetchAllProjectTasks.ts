import { useQuery } from "@tanstack/react-query";
import { fetchAllProjectTasks } from "../api";
import type { TaskResponse } from "../api";
import { taskKeys } from "../queryKeys";

export const useFetchAllProjectTasks = (projectId: string) => {
  return useQuery<TaskResponse[]>({
    queryKey: [taskKeys.byProject(projectId)],
    queryFn: () => fetchAllProjectTasks(projectId),
  });
};
