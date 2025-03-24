import React from "react";
import { StyleSheet } from "react-native";

import ScreenContainer from "@/components/screenContainer";

import { theme } from "@/theme";
import LanguagePicker from "./components/languagePicker";

const SettingsScreen = () => {
  return (
    <ScreenContainer>
      <LanguagePicker />
    </ScreenContainer>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.padding.lg,
  },
  searchContainer: {
    marginBottom: theme.margin.md,
  },
  listContainer: {
    flex: 1,
  },
});
