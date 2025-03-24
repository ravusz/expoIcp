import { useQuery } from "@tanstack/react-query";
import { fetchProjectStatistics } from "../api";
import { statisticsKeys } from "../queryKeys";
import type { ProjectResponse } from "../api";

export const useFetchProjectStatistics = (search: string | undefined) => {
  return useQuery<ProjectResponse[]>({
    queryKey: [statisticsKeys.byProjectSearch(search!)],
    queryFn: () => fetchProjectStatistics(search!),
    enabled: !!search,
  });
};
