import { useMutation, useQueryClient } from "@tanstack/react-query";

import { clearCache } from "../api";

export const useClearCache = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => clearCache(),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};
