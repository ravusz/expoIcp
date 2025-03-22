export const projectKeys = {
  all: ["projects"] as const,
  byId: (projectId: string) => [...projectKeys.all, "byId", projectId] as const,
};
