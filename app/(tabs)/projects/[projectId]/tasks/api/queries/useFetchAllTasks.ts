import { useQuery } from "@tanstack/react-query";
import { fetchAllTasks } from "../api";
import type { TaskResponse } from "../api";
import { taskKeys } from "../queryKeys";

export const useFetchAllTasks = () => {
  return useQuery<TaskResponse[]>({
    queryKey: taskKeys.all,
    queryFn: () => fetchAllTasks(),
  });
};
