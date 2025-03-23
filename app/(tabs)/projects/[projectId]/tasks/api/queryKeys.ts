export const taskKeys = {
  all: ["tasks"] as const,
  byProject: (projectId: string) =>
    [...taskKeys.all, "byProject", projectId] as const,
  byId: (projectId: string, taskId: string) =>
    [...taskKeys.all, "byId", projectId, taskId] as const,
};
