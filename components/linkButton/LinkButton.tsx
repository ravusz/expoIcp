import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from "react-native";
import { Link } from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { theme } from "@/theme";

type Props = {
  isLoading?: boolean;
  children: React.ReactNode;
  iconName: string;
  href: string;
};

const LinkButton = ({ isLoading, children, iconName, href }: Props) => {
  return (
    <Pressable style={styles.button}>
      <Link href={href}>
        {isLoading ? (
          <ActivityIndicator size={24} color={theme.colors.white} />
        ) : (
          <View style={styles.content}>
            <FontAwesome6
              name={iconName}
              size={24}
              color={theme.colors.white}
            />
            {children && <Text style={styles.text}>{children}</Text>}
          </View>
        )}
      </Link>
    </Pressable>
  );
};

export default LinkButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: theme.padding.sm,
    paddingHorizontal: theme.padding.md,
    backgroundColor: theme.colors.primary,
    elevation: 3,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderRadius: theme.borderRadius.md,
    minHeight: theme.formElement.minHeight,
    width: "100%",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: theme.fontSize.md,
    color: theme.colors.white,
    marginLeft: theme.margin.sm,
    fontWeight: "500",
  },
});
