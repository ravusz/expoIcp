import { useQueryClient } from "@tanstack/react-query";

import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

export const useInvalidateQueries = (queryKey: string[]) => {
  const queryClient = useQueryClient();

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries({
        queryKey,
      });
    }, [queryClient, queryKey]),
  );
};
