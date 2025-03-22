export const taskKeys = {
  all: ["tasks"] as const,
  byId: (projectId: string, taskId: string) =>
    [...taskKeys.all, "byId", projectId, taskId] as const,
};
