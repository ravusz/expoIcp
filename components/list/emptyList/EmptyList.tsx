import React from "react";
import { Text, StyleSheet, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { translate } from "@/i18n";
import { theme } from "@/theme";

type Props = {
  title: string;
  description: string;
  button?: React.ReactNode;
};

const EmptyList = ({ button, title, description }: Props) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="bed-empty" size={60} style={styles.icon} />
      <Text style={styles.title}>{translate(title)}</Text>
      <Text style={styles.description}>{translate(description)}</Text>
      {button}
    </View>
  );
};

export default EmptyList;

const styles = StyleSheet.create({
  icon: {
    paddingBottom: theme.padding.md,
    color: theme.colors.primary,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.white,
    padding: theme.padding.lg,
    elevation: 3,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderRadius: theme.borderRadius.md,
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: "bold",
    color: theme.colors.base,
    textAlign: "center",
    marginBottom: theme.margin.sm,
  },
  description: {
    fontSize: theme.fontSize.md,
    color: theme.colors.base,
    textAlign: "center",
    marginBottom: theme.margin.lg,
    paddingHorizontal: theme.padding.md,
  },
});
