import React from "react";
import { View, Text, StyleSheet, Alert, Pressable } from "react-native";
import type { NewProject } from "@/app/(tabs)/api/api";
import { theme } from "@/theme";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { translate } from "@/i18n";
import { useDeleteProject } from "@/app/(tabs)/api/mutations/useDeleteProject";
import { useRouter } from "expo-router";

const ProjectItem = ({ id, name, description }: NewProject) => {
  const { mutate, isPending } = useDeleteProject();
  const router = useRouter();

  const onSwipe = () => {
    Alert.alert(
      translate("project.deleteConfirmation.TITLE"),
      translate("project.deleteConfirmation.DESCRIPTION"),
      [
        {
          text: translate("project.deleteConfirmation.CANCEL_BUTTON"),
          style: "cancel",
        },
        {
          text: translate("project.deleteConfirmation.SUBMIT_BUTTON"),
          onPress: () => mutate({ projectId: id }),
        },
      ],
      { cancelable: true },
    );
  };

  const rightSwipe = () => {
    return (
      <View style={styles.deleteButton}>
        <MaterialCommunityIcons name="delete-outline" size={24} />
      </View>
    );
  };

  const handleClick = () => {
    router.push(`/project/tasks`);
  };

  return (
    <ReanimatedSwipeable
      renderRightActions={rightSwipe}
      onSwipeableOpen={onSwipe}
    >
      <Pressable
        onPress={handleClick}
        style={[
          styles.itemContainer,
          {
            opacity: isPending ? 0.5 : 1,
          },
        ]}
      >
        <Text style={styles.itemTitle}>{name}</Text>
        <Text style={styles.itemDescription}>{description}</Text>
      </Pressable>
    </ReanimatedSwipeable>
  );
};

export default ProjectItem;

const styles = StyleSheet.create({
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: 75,
    borderRadius: 10,
  },
  itemContainer: {
    backgroundColor: "#f8f9fa",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.base,
  },
  itemDescription: {
    fontSize: 14,
    color: theme.colors.coolGray,
    marginTop: 4,
  },
});
