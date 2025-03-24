import { useQuery } from "@tanstack/react-query";
import { fetchTotalStatistics } from "../api";
import type { TotalStatistics } from "../api";
import { statisticsKeys } from "../queryKeys";

export const useFetchStatistics = () => {
  return useQuery<TotalStatistics>({
    queryKey: statisticsKeys.allCounts(),
    queryFn: fetchTotalStatistics,
  });
};
