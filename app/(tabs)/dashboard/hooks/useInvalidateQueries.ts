import { useQueryClient } from "@tanstack/react-query";

import { statisticsKeys } from "../api/queryKeys";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

export const useInvalidateQueries = () => {
  const queryClient = useQueryClient();

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries({
        queryKey: statisticsKeys.allCounts(),
      });
    }, [queryClient]),
  );
};
