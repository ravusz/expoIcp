export const taskKeys = {
  all: ["tasks"] as const,
  byProject: (projectId: string) =>
    [...taskKeys.all, "byProject", projectId] as const,
  byId: (projectId: string, taskId: string) =>
    [...taskKeys.byProject(projectId), "byId", taskId] as const,
};
