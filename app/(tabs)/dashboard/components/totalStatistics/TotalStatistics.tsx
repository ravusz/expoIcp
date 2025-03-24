import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { theme } from "@/theme";
import { useFetchStatistics } from "../../api/queries/useFetchStatistics";
import { useTranslation } from "react-i18next";

const TotalStatistics = () => {
  const { t } = useTranslation();

  const { data, isLoading, isError } = useFetchStatistics();

  const getState = () => {
    if (isLoading) return "loading";
    if (isError) return "error";
    if (!data) return "empty";
    return "data";
  };

  const state = getState();

  return (
    <View style={{ gap: 8 }}>
      {
        {
          loading: (
            <>
              <View style={styles.container}>
                <ActivityIndicator size="large" color={theme.colors.info} />
              </View>
              <View style={styles.container}>
                <ActivityIndicator size="large" color={theme.colors.info} />
              </View>
            </>
          ),
          error: (
            <>
              <View style={styles.container}>
                <Text>{t("statistics.DATA_ERROR")}</Text>
              </View>
              <View style={styles.container}>
                <Text>{t("statistics.DATA_ERROR")}</Text>
              </View>
            </>
          ),
          empty: (
            <>
              <View style={styles.container}>
                <Text>{t("statistics.NO_DATA")}</Text>
              </View>
              <View style={styles.container}>
                <Text>{t("statistics.NO_DATA")}</Text>
              </View>
            </>
          ),
          data: (
            <>
              <View style={styles.container}>
                <Text style={styles.text}>
                  {`${t("statistics.PROJECTS_TOTAL_COUNT")} ${data?.count.projects}`}
                </Text>
              </View>
              <View style={styles.container}>
                <Text style={styles.text}>
                  {`${t("statistics.TASKS_TOTAL_COUNT")} ${data?.count.tasks}`}
                </Text>
              </View>
            </>
          ),
        }[state]
      }
    </View>
  );
};

export default TotalStatistics;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    minHeight: 100,
    borderRadius: theme.borderRadius.md,
    padding: theme.padding.lg,
    elevation: 3,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: theme.fontSize.md,
    color: theme.colors.base,
    fontWeight: "bold",
  },
});
