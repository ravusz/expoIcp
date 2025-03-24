import { useQuery } from "@tanstack/react-query";
import { fetchProjectStatistics } from "../api";
import { statisticsKeys } from "../queryKeys";
import type { ProjectStatisticsResponse } from "../api";

export const useFetchProjectStatistics = (search: string | undefined) => {
  return useQuery<ProjectStatisticsResponse[]>({
    queryKey: statisticsKeys.byProjectSearch(search!),
    queryFn: () => fetchProjectStatistics(search!),
    enabled: !!search,
    staleTime: 0,
    gcTime: 0,
  });
};
