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
    paddingBottom: 20,
    color: theme.colors.base,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.base,
    textAlign: "center",
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: theme.colors.base,
    textAlign: "center",
    marginBottom: 25,
    paddingHorizontal: 15,
  },
});
