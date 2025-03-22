import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import type { NewProject } from "@/app/(tabs)/projects/api/api";
import { theme } from "@/theme";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { translate } from "@/i18n";
import { useDeleteProject } from "@/app/(tabs)/projects/api/mutations/useDeleteProject";
import { Link } from "expo-router";
import ActionButton from "@/components/actionButton";
import { useRouter } from "expo-router";

const ProjectItem = ({ id, name, description }: NewProject) => {
  const { mutate, isPending } = useDeleteProject();
  const router = useRouter();

  const onDelete = () => {
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

  const onEdit = () => {
    router.navigate(`/projects/${id}/editProject`);
  };

  const rightSwipe = () => {
    return (
      <View style={styles.swipeContainer}>
        <ActionButton
          onPress={onEdit}
          variant="success"
          name="pencil-outline"
        />

        <ActionButton
          onPress={onDelete}
          variant="error"
          name="delete-outline"
          isLoading={isPending}
        />
      </View>
    );
  };

  return (
    <ReanimatedSwipeable renderRightActions={rightSwipe}>
      <Link href={`/projects/${id}/tasks`} style={styles.itemContainer}>
        <View style={styles.itemContent}>
          <View>
            <Text style={styles.itemTitle}>{name}</Text>
            <Text style={styles.itemDescription}>{description}</Text>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={theme.colors.coolGray}
          />
        </View>
      </Link>
    </ReanimatedSwipeable>
  );
};

export default ProjectItem;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
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
  itemContent: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  swipeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 16,
  },
});
