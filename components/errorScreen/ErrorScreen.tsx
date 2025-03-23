import React from "react";
import { Text, StyleSheet, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { translate } from "@/i18n";
import { theme } from "@/theme";

type Props = {
  button?: React.ReactNode;
};

const ErrorScreen = ({ button }: Props) => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="error-outline" size={60} style={styles.icon} />
      <Text style={styles.errorText}>{translate("errorScreen.TITLE")}</Text>
      <Text style={styles.messageText}>
        {translate("errorScreen.DESCRIPTION")}
      </Text>
      {button}
    </View>
  );
};

export default ErrorScreen;

const styles = StyleSheet.create({
  icon: {
    paddingBottom: theme.padding.md,
    color: theme.colors.danger,
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
  errorText: {
    fontSize: theme.fontSize.lg,
    fontWeight: "bold",
    color: theme.colors.danger,
    textAlign: "center",
    marginBottom: theme.margin.sm,
  },
  messageText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.base,
    textAlign: "center",
    marginBottom: theme.margin.lg,
    paddingHorizontal: theme.padding.md,
  },
});
