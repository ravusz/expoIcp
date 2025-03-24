import React, { useRef, useState } from "react";

import ScreenContainer from "@/components/screenContainer";
import TotalStatistics from "./components/totalStatistics";
import ProjectsSearchBottomSheet from "./components/projectsSearchBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet";
import Button from "@/components/button";

import {
  BarChart,
  LineChart,
  PieChart,
  PopulationPyramid,
  RadarChart,
} from "react-native-gifted-charts";
const data = [{ value: 50 }, { value: 80 }, { value: 90 }, { value: 70 }];

export default function Home() {
  const projectsSearchBottomSheetRef = useRef<BottomSheet>(null);

  return (
    <ScreenContainer>
      <TotalStatistics />
      <Button onPress={() => projectsSearchBottomSheetRef.current?.expand()}>
        Select project
      </Button>
      <PieChart data={data} />
      <ProjectsSearchBottomSheet ref={projectsSearchBottomSheetRef} />
    </ScreenContainer>
  );
}
