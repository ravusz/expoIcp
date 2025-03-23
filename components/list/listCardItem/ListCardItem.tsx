import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import type { PressableProps } from "react-native";

import { theme } from "@/theme";

type Props = PressableProps & {
  order?: number;
  title: string;
  description: string;
  isActive: boolean;
  children?: React.ReactNode;
};

const ListCardItem = ({
  order,
  title,
  description,
  children,
  isActive,
  onPress,
  ...rest
}: Props) => {
  return (
    <Pressable
      style={[styles.cardContainer, isActive && styles.activeCard]}
      onPress={onPress}
      {...rest}
    >
      <View style={styles.cardContent}>
        <View style={{ width: "85%" }}>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {order ? `${order}. ${title}` : title}
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
  activeCard: {
    opacity: 0.5,
  },
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
