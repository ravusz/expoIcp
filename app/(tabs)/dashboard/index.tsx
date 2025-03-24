import React, { useRef, useState, useMemo, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import BottomSheet from "@gorhom/bottom-sheet";

import ScreenContainer from "@/components/screenContainer";
import TotalStatistics from "./components/totalStatistics";
import ProjectsSearchBottomSheet from "./components/projectsSearchBottomSheet";
import Button from "@/components/button";
import IconButton from "@/components/iconButton";
import { theme } from "@/theme";
import type { ProjectStatisticsResponse } from "./api/api";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t } = useTranslation();

  const projectsSearchBottomSheetRef = useRef<BottomSheet>(null);
  const [selectedProject, onSelectProject] = useState<
    ProjectStatisticsResponse | undefined
  >(undefined);

  const mapTasksToChartData = useCallback(
    (tasks: ProjectStatisticsResponse["tasks"]) => {
      return [
        {
          name: t("taskStatuses.TO_DO"),
          value: tasks.TO_DO,
          color: "#f39c12",
        },
        {
          name: t("taskStatuses.IN_PROGRESS"),
          value: tasks.IN_PROGRESS,
          color: "#3498db",
        },
        {
          name: t("taskStatuses.IN_REVIEW"),
          value: tasks.IN_REVIEW,
          color: "#9b59b6",
        },
        {
          name: t("taskStatuses.DONE"),
          value: tasks.DONE,
          color: "#2ecc71",
        },
      ];
    },
    [t],
  );

  const chartData = useMemo(
    () => (selectedProject ? mapTasksToChartData(selectedProject.tasks) : []),
    [selectedProject, mapTasksToChartData],
  );

  return (
    <ScreenContainer>
      <TotalStatistics />
      <View
        style={{
          marginTop: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {selectedProject ? (
          <View style={styles.projectContainer}>
            <View style={styles.projectInfo}>
              <Text
                style={styles.projectName}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {selectedProject.name}
              </Text>
              <Text
                style={styles.projectDescription}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {selectedProject.description}
              </Text>
            </View>
            <IconButton
              name="close"
              variant="primary"
              onPress={() => onSelectProject(undefined)}
            />
          </View>
        ) : (
          <Button
            onPress={() => projectsSearchBottomSheetRef.current?.expand()}
          >
            {t("statistics.SELECT_PROJECT")}
          </Button>
        )}

        {selectedProject && (
          <View style={styles.chartContainer}>
            <PieChart
              data={chartData}
              donut
              showText
              showValuesAsLabels
              radius={80}
              textSize={14}
              textColor={theme.colors.white}
              centerLabelComponent={() => (
                <Text style={styles.chartCenterText}>Tasks</Text>
              )}
            />
            <View style={styles.legendContainer}>
              {chartData.map((item) => (
                <View key={item.name} style={styles.legendItem}>
                  <View
                    style={[
                      styles.legendColorBox,
                      { backgroundColor: item.color },
                    ]}
                  />
                  <Text style={styles.legendText}>
                    {item.name} ({item.value})
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
      <ProjectsSearchBottomSheet
        ref={projectsSearchBottomSheetRef}
        onSelectProject={onSelectProject}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  projectContainer: {
    backgroundColor: theme.colors.lightGray,
    padding: theme.padding.md,
    borderRadius: theme.borderRadius.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  projectInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: theme.fontSize.xl,
    fontWeight: "bold",
    color: theme.colors.primary,
    maxWidth: "85%",
  },
  projectDescription: {
    fontSize: theme.fontSize.md,
    color: theme.colors.secondary,
    maxWidth: "85%",
  },
  chartContainer: {
    alignItems: "center",
    marginTop: theme.margin.lg,
  },
  chartCenterText: {
    fontSize: theme.fontSize.lg,
    fontWeight: "bold",
    color: theme.colors.white,
  },
  legendContainer: {
    marginTop: theme.margin.md,
    alignItems: "center",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  legendColorBox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 8,
  },
  legendText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.black,
  },
});
