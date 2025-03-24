export const statisticsKeys = {
  all: ["statistics"] as const,
  allCounts: () => [...statisticsKeys.all, "allCounts"] as const,
  byProjectSearch: (search: string) =>
    [...statisticsKeys.all, "project", "search", search] as const,
};
