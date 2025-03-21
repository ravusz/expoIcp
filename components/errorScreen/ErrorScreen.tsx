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
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.base,
    textAlign: "center",
    marginBottom: 15,
  },
  messageText: {
    fontSize: 16,
    color: theme.colors.base,
    textAlign: "center",
    marginBottom: 25,
    paddingHorizontal: 15,
  },
});
