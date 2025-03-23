import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import type { PressableProps } from "react-native";

import { theme } from "@/theme";

type Props = PressableProps & {
  title: string;
  description: string;
  children?: React.ReactNode;
};

const ListCardItem = ({
  title,
  description,
  children,
  onPress,
  ...rest
}: Props) => {
  return (
    <Pressable style={styles.cardContainer} onPress={onPress} {...rest}>
      <View style={styles.cardContent}>
        <View>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.cardDescription} numberOfLines={1}>
            {description}
          </Text>
        </View>
        {children}
      </View>
    </Pressable>
  );
};

export default ListCardItem;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: theme.colors.white,
    padding: theme.padding.lg,
    marginVertical: theme.margin.sm,
    marginHorizontal: theme.margin.lg,
    borderRadius: theme.borderRadius.md,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: "bold",
    color: theme.colors.base,
  },
  cardDescription: {
    fontSize: theme.fontSize.md,
    color: theme.colors.secondary,
    marginTop: theme.margin.sm,
  },
});
