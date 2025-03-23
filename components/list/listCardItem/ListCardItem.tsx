import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { theme } from "@/theme";

type Props = {
  title: string;
  description: string;
  children?: React.ReactNode;
  onPress?: () => void;
};

const ListCardItem = ({ title, description, children, onPress }: Props) => {
  return (
    <Pressable style={styles.cardContainer} onPress={onPress}>
      <View style={styles.cardContent}>
        <View>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDescription}>{description}</Text>
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
